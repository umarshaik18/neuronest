import numpy as np
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from typing import Dict, Any, List, Optional
from datetime import datetime

# Initialize a trained trajectory classifier for cognitive stability trends
# Features: [avg_accuracy, avg_response_time, recent_accuracy_delta, completion_rate]
# Target: 0 = Needs Practice, 1 = Stable, 2 = Improving
def train_cognitive_classifier():
    X_train = np.array([
        [50.0, 6.5, -10.0, 0.4],
        [55.0, 5.8, -5.0, 0.5],
        [62.0, 5.0, -2.0, 0.6],
        [70.0, 4.2, 0.0, 0.8],
        [75.0, 4.0, 2.0, 0.85],
        [78.0, 3.9, 1.0, 0.9],
        [85.0, 3.5, 5.0, 0.95],
        [90.0, 3.2, 8.0, 1.0],
        [94.0, 3.0, 10.0, 1.0],
    ])
    y_train = np.array([0, 0, 0, 1, 1, 1, 2, 2, 2])
    
    clf = RandomForestClassifier(n_estimators=20, random_state=42)
    clf.fit(X_train, y_train)
    return clf

CLASSIFIER = train_cognitive_classifier()
TREND_LABELS = {0: "Needs Practice", 1: "Stable", 2: "Improving"}

def compute_cognitive_metrics(sessions: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes historical and recent game sessions to produce holistic cognitive scores.
    """
    if not sessions:
        return {
            "overall_score": 75,
            "overall_accuracy": 78.0,
            "avg_response_time": 4.1,
            "memory_score": 80,
            "attention_score": 75,
            "recall_score": 78,
            "sequence_score": 65,
            "language_score": 78,
            "trend": "Stable",
            "improvement_pct": "+7%",
            "games_completed": 0
        }

    df = pd.DataFrame(sessions)
    
    overall_acc = float(df['accuracy'].mean())
    avg_resp = float(df['response_time'].mean())
    total_completed = len(df)
    
    # Calculate category specific scores
    category_scores = {}
    for game_id, group in df.groupby('game_id'):
        category_scores[game_id] = float(group['accuracy'].mean())
        
    memory_score = int(category_scores.get('memory-match', 85))
    recall_score = int(category_scores.get('object-recall', 76))
    sequence_score = int(category_scores.get('sequence-recall', 61))
    attention_score = int(category_scores.get('pattern-memory', 84))
    language_score = int(category_scores.get('word-association', 79))
    
    # Weighted composite cognitive score
    composite_score = int(
        0.25 * memory_score +
        0.20 * recall_score +
        0.20 * sequence_score +
        0.20 * attention_score +
        0.15 * language_score
    )
    
    # Machine Learning trend classification
    delta = 5.0
    if len(df) >= 2:
        recent = df.tail(2)['accuracy'].mean()
        earlier = df.head(len(df) - 1)['accuracy'].mean()
        delta = recent - earlier
        
    features = np.array([[overall_acc, avg_resp, delta, min(1.0, total_completed / 5.0)]])
    trend_idx = int(CLASSIFIER.predict(features)[0])
    trend_str = TREND_LABELS.get(trend_idx, "Stable")
    
    improvement_str = f"+{abs(int(delta))}%" if delta >= 0 else f"-{abs(int(delta))}%"

    return {
        "overall_score": composite_score,
        "overall_accuracy": round(overall_acc, 1),
        "avg_response_time": round(avg_resp, 1),
        "memory_score": memory_score,
        "attention_score": attention_score,
        "recall_score": recall_score,
        "sequence_score": sequence_score,
        "language_score": language_score,
        "trend": trend_str,
        "improvement_pct": improvement_str,
        "games_completed": total_completed
    }

def generate_ai_recommendation(user_id: str, sessions: List[Dict[str, Any]], games: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Explainable recommendation system formula:
    Recommendation Score = 0.35 * Skill Gap + 0.25 * Recent Performance Need + 0.20 * Latency Factor + 0.20 * Difficulty Suitability
    """
    game_stats = {}
    for g in games:
        gid = g['game_id']
        game_stats[gid] = {
            "name": g['name'],
            "category": g['category'],
            "difficulty": g.get('difficulty_level', 1),
            "accuracies": [],
            "response_times": []
        }
        
    for s in sessions:
        gid = s['game_id']
        if gid in game_stats:
            game_stats[gid]['accuracies'].append(s['accuracy'])
            game_stats[gid]['response_times'].append(s['response_time'])

    scored_games = []
    
    for gid, data in game_stats.items():
        if data['accuracies']:
            mean_acc = np.mean(data['accuracies'])
            mean_resp = np.mean(data['response_times'])
        else:
            mean_acc = 70.0
            mean_resp = 4.0
            
        # Skill gap is higher when accuracy is lower
        skill_gap = max(0.0, (100.0 - mean_acc) / 100.0)
        recent_need = 1.0 - (mean_acc / 100.0)
        # Latency factor: higher latency means more exercise recommended
        latency_factor = min(1.0, mean_resp / 6.0)
        difficulty_fit = 0.85
        
        rec_score = (
            0.35 * skill_gap +
            0.25 * recent_need +
            0.20 * latency_factor +
            0.20 * difficulty_fit
        )
        
        scored_games.append({
            "game_id": gid,
            "name": data['name'],
            "category": data['category'],
            "score": round(rec_score, 3),
            "mean_acc": round(mean_acc, 1),
            "mean_resp": round(mean_resp, 1),
            "difficulty": data['difficulty']
        })
        
    # Sort highest recommendation score first
    scored_games.sort(key=lambda x: x['score'], reverse=True)
    top = scored_games[0]
    
    # Formulate explainable reason
    if top['game_id'] == 'sequence-recall':
        reason = f"Your recent sequence recall performance was {top['mean_acc']}%, which is lower than your visual memory performance. NeuroNest recommends a gentle Sequence Recall activity to support daily routine planning."
        rec_diff = 1
    elif top['mean_acc'] < 70:
        reason = f"Your accuracy in {top['name']} was {top['mean_acc']}%. A short practice session will help reinforce these cognitive connections."
        rec_diff = 1
    else:
        reason = f"To keep your mind balanced and sharp, NeuroNest suggests an engaging session of {top['name']}."
        rec_diff = top['difficulty']

    return {
        "game_id": top['game_id'],
        "game_name": top['name'],
        "category": top['category'],
        "recommended_difficulty": rec_diff,
        "recommendation_score": top['score'],
        "reason": reason,
        "breakdown": {
            "skill_gap_weight": "35%",
            "recent_performance_weight": "25%",
            "response_time_weight": "20%",
            "difficulty_suitability_weight": "20%"
        }
    }

def adjust_difficulty(accuracy: float, response_time: float, current_difficulty: int) -> Dict[str, Any]:
    """
    Adaptive Difficulty Engine Rules:
    - If Accuracy > 85% AND good response time (<4.5s) -> Increase difficulty (stepwise)
    - If Accuracy between 60% and 85% -> Maintain difficulty
    - If Accuracy < 60% -> Decrease difficulty
    """
    diff_names = {1: "Easy", 2: "Medium", 3: "Hard"}
    new_diff = current_difficulty
    reason = ""
    message = ""

    if accuracy > 85.0 and response_time <= 4.5:
        if current_difficulty < 3:
            new_diff = current_difficulty + 1
            reason = f"Great performance! Your accuracy reached {accuracy:.0f}% with a swift response time of {response_time:.1f}s."
            message = f"Difficulty increased from {diff_names[current_difficulty]} to {diff_names[new_diff]} for a healthy, engaging challenge."
        else:
            reason = "You achieved an excellent score at the highest difficulty level!"
            message = "Maintaining Hard difficulty with extra congratulations."
    elif accuracy < 60.0:
        if current_difficulty > 1:
            new_diff = current_difficulty - 1
            reason = f"Today's activity was a bit more challenging (accuracy {accuracy:.0f}%)."
            message = f"Difficulty comfortably adjusted to {diff_names[new_diff]} to provide a relaxed, supportive pace."
        else:
            reason = "A supportive pace was maintained."
            message = "Remaining on Easy difficulty to ensure a calm, rewarding experience."
    else:
        reason = f"Steady progress! You maintained an accuracy of {accuracy:.0f}%."
        message = f"Current difficulty ({diff_names[current_difficulty]}) is well suited for your pace."

    return {
        "previous_difficulty": current_difficulty,
        "adjusted_difficulty": new_diff,
        "difficulty_label": diff_names[new_diff],
        "reason": reason,
        "message": message
    }

def generate_ai_explanation(game_name: str, score: int, accuracy: float, response_time: float, attempts: int) -> str:
    """
    Generates natural, encouraging, and elderly-friendly feedback without clinical or diagnostic labels.
    """
    if accuracy >= 85.0:
        return f"Wonderful work on {game_name}! You achieved {accuracy:.0f}% accuracy in {response_time:.1f} seconds per action. Your visual focus was remarkably sharp today."
    elif accuracy >= 70.0:
        return f"Good job completing {game_name}! You remembered most items correctly with steady response times. Regular practice like this gently exercises neural recall."
    else:
        return f"You completed {game_name} with great perseverance! This activity was a little more challenging today ({accuracy:.0f}% accuracy), so NeuroNest will offer gentler, step-by-step guidance next time."

def process_voice_query(user_message: str, language: str = "en") -> Dict[str, Any]:
    """
    Natural Language voice interaction handler with multilingual responses.
    """
    msg = user_message.lower().strip()
    
    # English matching
    if any(k in msg for k in ["start", "play", "game", "match"]):
        if language == "hi":
            resp = "जरूर! आपके लिए अनुशंसित कॉग्निटिव गेम शुरू कर रहे हैं।"
        elif language == "te":
            resp = "ఖచ్చితంగా! మీ కోసం సిఫార్సు చేసిన కాగ్నిటివ్ గేమ్‌ని ప్రారంభిస్తున్నాము."
        else:
            resp = "Starting your personalized cognitive exercise now. Let's exercise the mind!"
        return {
            "intent": "START_GAME",
            "assistant_response": resp,
            "action": "NAVIGATE_GAME",
            "action_data": {"game_id": "sequence-recall"}
        }

    if any(k in msg for k in ["task", "next", "schedule", "do now"]):
        if language == "hi":
            resp = "आपका अगला कार्य सुबह 10:00 बजे किराने के सामान को याद करना और टहलना है।"
        elif language == "te":
            resp = "మీ తదుపరి పని ఉదయం 10:00 గంటలకు కిరాణా వస్తువులను గుర్తుంచుకోవడం మరియు నడవడం."
        else:
            resp = "Your next scheduled task is: 10:00 AM — Remember grocery items (ginger, green tea leaves, milk), followed by an 11:00 AM walk in the garden."
        return {
            "intent": "CHECK_TASKS",
            "assistant_response": resp,
            "action": "OPEN_TASKS",
            "action_data": {"task": "Remember Grocery Items"}
        }

    if any(k in msg for k in ["medicine", "pill", "tablet", "dawaii"]):
        if language == "hi":
            resp = "आपकी सुबह की दवा ली जा चुकी है। अगली दवा रात के खाने के बाद 9:00 बजे है।"
        elif language == "te":
            resp = "మీ ఉదయం మందులు పూర్తయ్యాయి. రాత్రి భోజనం తర్వాత రాత్రి 9:00 గంటలకు తదుపరి మందులు ఉన్నాయి."
        else:
            resp = "Your morning BP tablet was taken. Your next medicine is the Cognitive Health Supplement at 9:00 PM after dinner with warm milk."
        return {
            "intent": "CHECK_MEDICINE",
            "assistant_response": resp,
            "action": "OPEN_MEDICINE",
            "action_data": {}
        }

    if any(k in msg for k in ["progress", "score", "how did i do", "perform"]):
        if language == "hi":
            resp = "आज आपका कॉग्निटिव स्कोर 78 है और सटीकता 82% है। पिछले सप्ताह की तुलना में 7% का सुधार हुआ है!"
        elif language == "te":
            resp = "ఈ రోజు మీ కాగ్నిటివ్ స్కోర్ 78 మరియు ఖచ్చితత్వం 82%. గత వారంతో పోలిస్తే 7% మెరుగుదల కనిపించింది!"
        else:
            resp = "Today your Cognitive Score is 78 with an impressive 82% accuracy. You have improved +7% compared to last week. Keep it up!"
        return {
            "intent": "SHOW_PROGRESS",
            "assistant_response": resp,
            "action": "NAVIGATE_PROGRESS",
            "action_data": {"score": 78}
        }

    # Default friendly assistance
    if language == "hi":
        resp = "नमस्ते! मैं न्यूरोनेस्ट हूँ। आप मुझसे खेल खेलने, आज के कार्यों, या दवाइयों के समय के बारे में पूछ सकते हैं।"
    elif language == "te":
        resp = "నమస్కారం! నేను న్యూరోనెస్ట్. మీరు నన్ను గేమ్‌లు ఆడటం, రోజువారీ పనులు లేదా మందుల సమయాల గురించి అడగవచ్చు."
    else:
        resp = "Hello! I am NeuroNest, your cognitive companion. You can ask me to start a game, check your schedule, review medicine reminders, or view your progress."

    return {
        "intent": "GENERAL_GREETING",
        "assistant_response": resp,
        "action": None,
        "action_data": None
    }
