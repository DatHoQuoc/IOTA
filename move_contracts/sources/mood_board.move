module move_contracts::mood_board {
    use iota::object::{Self, UID};
    use iota::transfer;
    use iota::tx_context::{Self, TxContext};
    use iota::event;

    public struct MoodBoard has key, store {
        id: UID,
        happy_count: u64,
        neutral_count: u64,
        sad_count: u64,
    }

    public struct MoodSubmitted has copy, drop {
        user: address,
        mood_type: u8,
    }

    fun init(ctx: &mut TxContext) {
        let board = MoodBoard {
            id: object::new(ctx),
            happy_count: 0,
            neutral_count: 0,
            sad_count: 0,
        };
        transfer::share_object(board);
    }

    public entry fun submit_mood(board: &mut MoodBoard, mood: u8, ctx: &mut TxContext) {
        if (mood == 0) {
            board.happy_count = board.happy_count + 1;
        } else if (mood == 1) {
            board.neutral_count = board.neutral_count + 1;
        } else {
            board.sad_count = board.sad_count + 1;
        };

        event::emit(MoodSubmitted {
            user: tx_context::sender(ctx),
            mood_type: mood,
        });
    }
}
