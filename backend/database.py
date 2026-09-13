import sqlite3
import json
from datetime import datetime, timedelta

DB_PATH = "neuronest.db"

def init_db():
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    
    # 1. users
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        user_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        age INTEGER,
        gender TEXT,
        date_of_birth TEXT,
        region TEXT,
        preferred_language TEXT,
        dementia_stage TEXT,
        created_at TEXT
    )
    """)

    # 2. caregivers
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS caregivers (
        caregiver_id TEXT PRIMARY KEY,
        user_id TEXT,
        name TEXT NOT NULL,
        relation TEXT,
        phone TEXT,
        email TEXT UNIQUE,
        password_hash TEXT,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    # 3. games
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS games (
        game_id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT,
        difficulty_level INTEGER,
        description TEXT,
        image_url TEXT,
        created_at TEXT
    )
    """)

    # 4. game_sessions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS game_sessions (
        session_id TEXT PRIMARY KEY,
        user_id TEXT,
        game_id TEXT,
        start_time TEXT,
        end_time TEXT,
        score INTEGER,
        accuracy REAL,
        response_time REAL,
        attempts INTEGER,
        difficulty_level INTEGER,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(game_id) REFERENCES games(game_id)
    )
    """)

    # 5. recommendations
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS recommendations (
        rec_id TEXT PRIMARY KEY,
        user_id TEXT,
        game_id TEXT,
        reason TEXT,
        recommendation_score REAL,
        recommended_difficulty INTEGER,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id),
        FOREIGN KEY(game_id) REFERENCES games(game_id)
    )
    """)

    # 6. progress_logs
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS progress_logs (
        log_id TEXT PRIMARY KEY,
        user_id TEXT,
        date TEXT,
        metric_type TEXT,
        value REAL,
        trend TEXT,
        notes TEXT,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    # 7. daily_tasks
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS daily_tasks (
        task_id TEXT PRIMARY KEY,
        user_id TEXT,
        title TEXT,
        description TEXT,
        scheduled_time TEXT,
        status TEXT,
        completed_at TEXT,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    # 8. memory_items
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS memory_items (
        memory_id TEXT PRIMARY KEY,
        user_id TEXT,
        category TEXT,
        title TEXT,
        description TEXT,
        reminder_time TEXT,
        photo_url TEXT,
        relation TEXT,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    # 9. voice_interactions
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS voice_interactions (
        interaction_id TEXT PRIMARY KEY,
        user_id TEXT,
        user_message TEXT,
        assistant_response TEXT,
        language TEXT,
        created_at TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    # 10. accessibility_settings
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS accessibility_settings (
        setting_id TEXT PRIMARY KEY,
        user_id TEXT,
        font_size TEXT,
        high_contrast INTEGER,
        reduce_motion INTEGER,
        voice_enabled INTEGER,
        language TEXT,
        FOREIGN KEY(user_id) REFERENCES users(user_id)
    )
    """)

    conn.commit()
    seed_demo_data(conn)
    conn.close()

def seed_demo_data(conn):
    cursor = conn.cursor()
    
    # Check if demo user already exists
    cursor.execute("SELECT COUNT(*) FROM users WHERE user_id = 'user-anita-01'")
    if cursor.fetchone()[0] > 0:
        return  # Already seeded

    now = datetime.utcnow().isoformat()
    yesterday = (datetime.utcnow() - timedelta(days=1)).isoformat()
    two_days_ago = (datetime.utcnow() - timedelta(days=2)).isoformat()
    three_days_ago = (datetime.utcnow() - timedelta(days=3)).isoformat()

    # 1. Primary Elderly User: Anita Sharma (Assam)
    cursor.execute("""
    INSERT INTO users VALUES (
        'user-anita-01', 'Anita Sharma', 72, 'Female', '1954-08-15', 'Assam', 'en',
        'Mild Cognitive Impairment (Caregiver noted)', ?
    )
    """, (now,))

    # 2. Caregiver: Priya Sharma
    cursor.execute("""
    INSERT INTO caregivers VALUES (
        'care-priya-01', 'user-anita-01', 'Priya Sharma', 'Daughter',
        '+91 98765 43210', 'priya@neuronest.org', 'caregiver123', ?
    )
    """, (now,))

    # 3. 5 Core Cognitive Games
    games = [
        ('memory-match', 'Memory Match', 'Memory', 1, 'Exercise visual working memory by pairing everyday household items (Keys, Glasses, Cup, Book).', '/icons/memory.svg', now),
        ('object-recall', 'Object Recall', 'Recall', 1, 'Inspect familiar objects for 5-10 seconds, then identify which items you observed.', '/icons/recall.svg', now),
        ('sequence-recall', 'Sequence Recall', 'Logic', 1, 'Reorder steps for meaningful daily activities like preparing morning tea, brushing teeth, and taking medicine.', '/icons/sequence.svg', now),
        ('pattern-memory', 'Pattern Memory', 'Pattern', 1, 'Recall and reproduce illuminated spatial grid arrangements.', '/icons/pattern.svg', now),
        ('word-association', 'Word Association', 'Language', 1, 'Connect related everyday words and life concepts to reinforce semantic neural pathways.', '/icons/words.svg', now),
    ]
    cursor.executemany("INSERT INTO games VALUES (?, ?, ?, ?, ?, ?, ?)", games)

    # 4. Realistic Game Sessions for Anita Sharma
    sessions = [
        ('sess-01', 'user-anita-01', 'memory-match', three_days_ago, three_days_ago, 85, 88.0, 3.8, 10, 1, three_days_ago),
        ('sess-02', 'user-anita-01', 'object-recall', two_days_ago, two_days_ago, 78, 76.0, 4.2, 5, 1, two_days_ago),
        ('sess-03', 'user-anita-01', 'pattern-memory', yesterday, yesterday, 82, 84.0, 3.9, 6, 1, yesterday),
        ('sess-04', 'user-anita-01', 'word-association', yesterday, yesterday, 80, 79.0, 3.6, 8, 1, yesterday),
        ('sess-05', 'user-anita-01', 'sequence-recall', now, now, 62, 61.0, 5.2, 7, 1, now),
    ]
    cursor.executemany("INSERT INTO game_sessions VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", sessions)

    # 5. Recommendation
    cursor.execute("""
    INSERT INTO recommendations VALUES (
        'rec-01', 'user-anita-01', 'sequence-recall',
        'Your recent sequence recall performance is lower (61%) than your visual memory performance (88%). NeuroNest recommends additional sequence practice.',
        0.84, 1, ?
    )
    """, (now,))

    # 6. Daily Tasks
    tasks = [
        ('task-01', 'user-anita-01', 'Breakfast with Assam Tea', 'Enjoy a nourishing morning meal and warm tea.', '08:00 AM', 'completed', yesterday, now),
        ('task-02', 'user-anita-01', 'Morning Medicine', 'Take blood pressure tablet and multivitamin.', '09:00 AM', 'completed', yesterday, now),
        ('task-03', 'user-anita-01', 'Remember Grocery Items', 'Recall 3 items: ginger, green tea leaves, milk.', '10:00 AM', 'pending', None, now),
        ('task-04', 'user-anita-01', 'Walk in the Garden', 'Gentle 15-minute walk outside in fresh air.', '11:00 AM', 'pending', None, now),
        ('task-05', 'user-anita-01', 'Lunch & Rest', 'Light lunch and a restful afternoon pause.', '01:00 PM', 'pending', None, now),
        ('task-06', 'user-anita-01', 'Family Video Call', 'Talk with daughter Priya and grandson Rohan.', '05:00 PM', 'pending', None, now),
    ]
    cursor.executemany("INSERT INTO daily_tasks VALUES (?, ?, ?, ?, ?, ?, ?, ?)", tasks)

    # 7. Memory Companion Items
    memories = [
        ('mem-01', 'user-anita-01', 'people', 'Priya Sharma (Daughter)', 'Lives in Guwahati. Calls every evening at 5:00 PM. Loves gardening.', None, '/photos/priya.jpg', 'Daughter', now),
        ('mem-02', 'user-anita-01', 'people', 'Rohan (Grandson)', '7 years old. Loves drawing elephants and reading folk tales with grandma.', None, '/photos/rohan.jpg', 'Grandson', now),
        ('mem-03', 'user-anita-01', 'places', 'Home Sweet Home', 'House #12, Hill View Road, Dibrugarh, Assam.', None, None, 'Home', now),
        ('mem-04', 'user-anita-01', 'places', 'Brahmaputra Riverfront Park', 'Favorite spot for Sunday evening strolls and watching the river.', None, None, 'Park', now),
        ('mem-05', 'user-anita-01', 'places', 'Dr. Barua Healthcare Center', 'Family Physician Clinic on Station Road. Dr. Barua visits on Thursdays.', None, None, 'Clinic', now),
        ('mem-06', 'user-anita-01', 'medicine', 'Morning BP Tablet (5mg)', 'Take with water after breakfast.', '09:00 AM', None, 'Daily Morning', now),
        ('mem-07', 'user-anita-01', 'medicine', 'Cognitive Health Supplement', 'Take at night after dinner with warm milk.', '09:00 PM', None, 'Daily Night', now),
        ('mem-08', 'user-anita-01', 'routine', 'Preparing Traditional Assam Tea', 'Boil water -> Add crushed ginger & bay leaf -> Add tea leaves -> Add warm milk & boil once -> Strain into favorite cup.', None, None, 'Daily Routine', now),
        ('mem-09', 'user-anita-01', 'notes', 'Key Location Reminder', 'Spectacles and house keys are always on the wooden tray beside the telephone table.', None, None, 'Personal Note', now),
    ]
    cursor.executemany("INSERT INTO memory_items VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", memories)

    # 8. Accessibility Settings
    cursor.execute("""
    INSERT INTO accessibility_settings VALUES (
        'acc-01', 'user-anita-01', 'normal', 0, 0, 1, 'en'
    )
    """)

    conn.commit()

def get_db():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn
# Ensure init_db is called on import
try:
    init_db()
except Exception:
    pass
