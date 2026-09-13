export interface GameSessionPayload {
  user_id: string;
  game_id: string;
  score: number;
  accuracy: number;
  response_time: number;
  attempts: number;
  difficulty_level: number;
}

export interface GameResultResponse {
  status: string;
  session_id: string;
  score: number;
  accuracy: number;
  response_time: number;
  difficulty: number;
  ai_feedback: string;
  difficulty_adjustment: {
    previous_difficulty: number;
    adjusted_difficulty: number;
    difficulty_label: string;
    reason: string;
    message: string;
  };
  recommended_next_game: {
    game_id: string;
    game_name: string;
    category: string;
    recommended_difficulty: number;
    recommendation_score: number;
    reason: string;
  };
}

export const api = {
  // Games
  async getGames() {
    try {
      const res = await fetch('/api/games');
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      {
        game_id: 'memory-match',
        name: 'Memory Match',
        category: 'Memory',
        difficulty_level: 1,
        description: 'Pair familiar everyday household items (Keys, Glasses, Cup, Book) to exercise visual working memory.'
      },
      {
        game_id: 'object-recall',
        name: 'Object Recall',
        category: 'Recall',
        difficulty_level: 1,
        description: 'Inspect familiar items for 5-10 seconds, then identify which objects were presented.'
      },
      {
        game_id: 'sequence-recall',
        name: 'Sequence Recall',
        category: 'Logic',
        difficulty_level: 1,
        description: 'Reorder steps for meaningful daily activities like preparing morning tea, brushing teeth, and taking medicine.'
      },
      {
        game_id: 'pattern-memory',
        name: 'Pattern Memory',
        category: 'Pattern',
        difficulty_level: 1,
        description: 'Recall and reproduce illuminated spatial grid arrangements.'
      },
      {
        game_id: 'word-association',
        name: 'Word Association',
        category: 'Language',
        difficulty_level: 1,
        description: 'Connect related everyday words and life concepts to reinforce semantic neural pathways.'
      }
    ];
  },

  // Game Result submission
  async submitGameResult(gameId: string, payload: GameSessionPayload): Promise<GameResultResponse> {
    try {
      const res = await fetch(`/api/games/${gameId}/result`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    // Fallback AI calculation
    const diffNames: Record<number, string> = { 1: 'Easy', 2: 'Medium', 3: 'Hard' };
    let adjusted = payload.difficulty_level;
    let adjReason = '';
    let adjMsg = '';

    if (payload.accuracy >= 85 && payload.response_time <= 4.5) {
      if (payload.difficulty_level < 3) {
        adjusted = payload.difficulty_level + 1;
        adjReason = `Excellent precision! You achieved ${payload.accuracy.toFixed(0)}% accuracy with swift responses.`;
        adjMsg = `Difficulty gently increased to ${diffNames[adjusted]} to keep your mind stimulated.`;
      } else {
        adjReason = 'You maintained great accuracy at the highest level.';
        adjMsg = 'Staying on Hard mode with compliments!';
      }
    } else if (payload.accuracy < 60) {
      if (payload.difficulty_level > 1) {
        adjusted = payload.difficulty_level - 1;
        adjReason = `This exercise was more challenging today (accuracy ${payload.accuracy.toFixed(0)}%).`;
        adjMsg = `Difficulty adjusted to ${diffNames[adjusted]} to ensure a comfortable, relaxing pace.`;
      } else {
        adjReason = 'Gentle pace maintained.';
        adjMsg = 'Remaining on Easy difficulty for a supportive experience.';
      }
    } else {
      adjReason = `Steady accuracy of ${payload.accuracy.toFixed(0)}%.`;
      adjMsg = `Current difficulty (${diffNames[payload.difficulty_level]}) remains well-suited.`;
    }

    let feedback = '';
    if (payload.accuracy >= 85) {
      feedback = `Wonderful work on this activity! Your visual recall was fast and accurate today.`;
    } else if (payload.accuracy >= 70) {
      feedback = `Good job completing the exercise! Regular practice gently exercises neural recall.`;
    } else {
      feedback = `You showed great perseverance! This activity was a little more challenging today, so NeuroNest will provide gentler practice next time.`;
    }

    return {
      status: 'success',
      session_id: 'sess-' + Math.random().toString(36).substr(2, 9),
      score: payload.score,
      accuracy: payload.accuracy,
      response_time: payload.response_time,
      difficulty: payload.difficulty_level,
      ai_feedback: feedback,
      difficulty_adjustment: {
        previous_difficulty: payload.difficulty_level,
        adjusted_difficulty: adjusted,
        difficulty_label: diffNames[adjusted],
        reason: adjReason,
        message: adjMsg
      },
      recommended_next_game: {
        game_id: 'sequence-recall',
        game_name: 'Sequence Recall',
        category: 'Logic',
        recommended_difficulty: 1,
        recommendation_score: 0.84,
        reason: 'Your recent sequence recall performance is lower than your visual memory performance. NeuroNest recommends additional sequence practice.'
      }
    };
  },

  // Recommendations
  async getRecommendation(userId: string) {
    try {
      const res = await fetch(`/api/recommendations/${userId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      game_id: 'sequence-recall',
      game_name: 'Sequence Recall',
      category: 'Logic',
      recommended_difficulty: 1,
      recommendation_score: 0.84,
      reason: 'Your recent sequence recall performance is lower (61%) than your visual memory performance (88%). NeuroNest recommends additional sequence practice to support daily routine planning.',
      breakdown: {
        skill_gap_weight: '35%',
        recent_performance_weight: '25%',
        response_time_weight: '20%',
        difficulty_suitability_weight: '20%'
      }
    };
  },

  // Performance Analytics
  async getPerformance(userId: string) {
    try {
      const res = await fetch(`/api/performance/${userId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      overall_score: 78,
      overall_accuracy: 82.0,
      avg_response_time: 4.1,
      memory_score: 82,
      attention_score: 74,
      recall_score: 79,
      sequence_score: 63,
      language_score: 78,
      trend: 'Stable',
      improvement_pct: '+11%',
      games_completed: 5
    };
  },

  async getWeeklyTrends(userId: string) {
    try {
      const res = await fetch(`/api/performance/${userId}/weekly`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { day: 'Mon', score: 72, accuracy: 75, responseTime: 4.6, memory: 78, recall: 72 },
      { day: 'Tue', score: 74, accuracy: 78, responseTime: 4.4, memory: 80, recall: 74 },
      { day: 'Wed', score: 73, accuracy: 76, responseTime: 4.5, memory: 79, recall: 73 },
      { day: 'Thu', score: 76, accuracy: 80, responseTime: 4.2, memory: 82, recall: 75 },
      { day: 'Fri', score: 75, accuracy: 79, responseTime: 4.3, memory: 81, recall: 76 },
      { day: 'Sat', score: 79, accuracy: 84, responseTime: 3.9, memory: 85, recall: 78 },
      { day: 'Sun', score: 78, accuracy: 82, responseTime: 4.1, memory: 84, recall: 77 }
    ];
  },

  // Tasks
  async getTasks(userId: string) {
    try {
      const res = await fetch(`/api/tasks/${userId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { task_id: 'task-01', title: 'Breakfast with Assam Tea', description: 'Enjoy a nourishing morning meal.', scheduled_time: '08:00 AM', status: 'completed' },
      { task_id: 'task-02', title: 'Morning Medicine', description: 'Take blood pressure tablet and multivitamin.', scheduled_time: '09:00 AM', status: 'completed' },
      { task_id: 'task-03', title: 'Remember Grocery Items', description: 'Recall 3 items: ginger, green tea leaves, milk.', scheduled_time: '10:00 AM', status: 'pending' },
      { task_id: 'task-04', title: 'Walk in the Garden', description: 'Gentle 15-minute walk outside in fresh air.', scheduled_time: '11:00 AM', status: 'pending' },
      { task_id: 'task-05', title: 'Lunch & Rest', description: 'Light lunch and a restful afternoon pause.', scheduled_time: '01:00 PM', status: 'pending' },
      { task_id: 'task-06', title: 'Family Video Call', description: 'Talk with daughter Priya and grandson Rohan.', scheduled_time: '05:00 PM', status: 'pending' }
    ];
  },

  async toggleTask(taskId: string) {
    try {
      const res = await fetch(`/api/tasks/${taskId}/toggle`, { method: 'PUT' });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { status: 'success' };
  },

  async createTask(data: { user_id: string; title: string; description?: string; scheduled_time: string }) {
    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { status: 'success', task_id: 'task-' + Math.random().toString(36).substr(2, 6) };
  },

  // Memory Items
  async getMemories(userId: string) {
    try {
      const res = await fetch(`/api/memory/${userId}`);
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { memory_id: 'mem-01', category: 'people', title: 'Priya Sharma', relation: 'Daughter', description: 'Calls every evening at 5:00 PM from Guwahati. Always reminds grandma to drink water.' },
      { memory_id: 'mem-02', category: 'people', title: 'Rohan', relation: 'Grandson', description: '7 years old. Loves drawing elephants and listening to grandma recite folk stories.' },
      { memory_id: 'mem-03', category: 'places', title: 'Home Sweet Home', relation: 'Residence', description: 'House #12, Hill View Road, Dibrugarh, Assam.' },
      { memory_id: 'mem-04', category: 'places', title: 'Brahmaputra Riverside Park', relation: 'Walking Spot', description: 'Gentle walking trails with fresh breezes and scenic sunset views.' },
      { memory_id: 'mem-05', category: 'places', title: 'Dr. Barua Healthcare Center', relation: 'Clinic', description: 'Station Road. Dr. Barua is available Thursday mornings.' },
      { memory_id: 'mem-06', category: 'medicine', title: 'Morning BP Tablet (5mg)', relation: 'Daily Morning', scheduled_time: '09:00 AM', description: 'Take with warm water after breakfast.' },
      { memory_id: 'mem-07', category: 'medicine', title: 'Cognitive Health Supplement', relation: 'Daily Night', scheduled_time: '09:00 PM', description: 'Take after dinner with warm milk.' },
      { memory_id: 'mem-08', category: 'routine', title: 'Assam Tea Preparation', relation: 'Routine', description: 'Boil water -> Ginger & spices -> Tea leaves -> Milk -> Strain into favorite mug.' },
      { memory_id: 'mem-09', category: 'notes', title: 'Glasses & Keys Location', relation: 'Reminder', description: 'Always on the carved wooden tray near the entrance table.' }
    ];
  },

  async addMemory(data: { user_id: string; category: string; title: string; description: string; reminder_time?: string; photo_url?: string; relation?: string }) {
    try {
      const res = await fetch('/api/memory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) return await res.json();
    } catch (e) {}
    return { status: 'success', memory_id: 'mem-' + Math.random().toString(36).substr(2, 6) };
  },

  // Voice Interaction
  async interactVoice(userId: string, userMessage: string, language: string) {
    try {
      const res = await fetch('/api/voice/interact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: userId, user_message: userMessage, language })
      });
      if (res.ok) return await res.json();
    } catch (e) {}

    const msg = userMessage.toLowerCase();
    let resp = "I am here to help you exercise your mind and remember your daily tasks.";
    if (msg.includes("task") || msg.includes("next")) {
      resp = "Your next scheduled task is: 10:00 AM — Remember grocery items, followed by a walk in the garden.";
    } else if (msg.includes("game") || msg.includes("start") || msg.includes("play")) {
      resp = "Starting your Sequence Recall activity now. Let's practice daily routines!";
    } else if (msg.includes("medicine")) {
      resp = "Your morning medicine was completed. Your next supplement is at 9:00 PM after dinner.";
    } else if (msg.includes("score") || msg.includes("progress")) {
      resp = "Today your Cognitive Score is 78 with 82% accuracy. You improved +11% this week!";
    }
    return {
      user_message: userMessage,
      assistant_response: resp,
      language
    };
  },

  // Admin
  async getAdminMetrics() {
    try {
      const res = await fetch('/api/admin/metrics');
      if (res.ok) return await res.json();
    } catch (e) {}
    return {
      total_users: 148,
      elderly_patients: 104,
      active_caregivers: 44,
      games_played_today: 312,
      total_games_played: 3942,
      avg_cognitive_score: 77.2,
      retention_rate: '92.4%'
    };
  },

  async getRegionalData() {
    try {
      const res = await fetch('/api/admin/regional');
      if (res.ok) return await res.json();
    } catch (e) {}
    return [
      { state: 'Assam', users: 58, sessions: 1420, language: 'Assamese / English' },
      { state: 'Meghalaya', users: 22, sessions: 510, language: 'Khasi / English' },
      { state: 'Manipur', users: 18, sessions: 430, language: 'Manipuri / English' },
      { state: 'Mizoram', users: 15, sessions: 380, language: 'Mizo / English' },
      { state: 'Nagaland', users: 14, sessions: 320, language: 'Nagamese / English' },
      { state: 'Tripura', users: 16, sessions: 390, language: 'Bengali / Kokborok' },
      { state: 'Arunachal Pradesh', users: 12, sessions: 270, language: 'Hindi / English' },
      { state: 'Sikkim', users: 9, sessions: 210, language: 'Nepali / English' }
    ];
  }
};
