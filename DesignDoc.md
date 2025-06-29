🧩 Core Gameplay

This is a fast-paced 2D single-screen arcade game. The player controls a horizontal paddle located at the bottom of the screen, which is used to bounce a single ball upward. At the top of the screen is a formation of alien enemies arranged in a grid. The player’s goal is to destroy these aliens using the ball while keeping the ball in play using the paddle.

🎮 Player Control

    The paddle can move left and right only, along the bottom of the screen.

    When the ball hits the paddle, it bounces back. The angle of reflection depends on:

        The ball’s incoming angle and speed.

        The paddle’s current speed and direction at the moment of contact.

    The player’s main challenge is to keep the ball from falling off the screen by skillfully positioning the paddle.

🟢 Ball Behavior

    The ball remains in constant motion unless lost.

    It bounces off:

        The left and right screen boundaries.

        The ceiling.

        The paddle.

        Any alien it hits.

    When the ball hits an alien:

        The alien is destroyed.

        The player earns points.

        The ball bounces off as appropriate.

    If the ball goes below the paddle and off the screen:

        The player loses one life.

        The ball is reset for the next attempt.

👾 Alien Behavior with Reinforcement System

    Aliens appear in a grid (rows and columns) near the top of the screen.

    The entire alien formation moves horizontally in a wave. When it hits a screen edge:

        It shifts downward by a fixed vertical step. 20 pixels.

        It spawns a new row of aliens at the top of the formation—but only if reinforcements are still available for that level.
        Each reinforcement row always consists of 10 aliens, regardless of how many remain from the previous wave.

        The direction of movement reverses.

    The horizontal movement speed increases slightly with each level, making the wave pattern faster over time.

    The aliens themselves do not speed up based on how many are destroyed.

    The aliens never attack—they only move downward.

    If any alien reaches the paddle area, the game ends immediately.

    A counter tracks how many alien reinforcements remain for the current level.

💣 Bomb Mechanic

    Destroying a purple alien immediately spawns a bomb.

    The bomb starts from the defeated alien's horizontal position and slowly descends vertically.

    The bomb can be collected in two ways:

        By hitting it with the ball.

        By touching it with the paddle.

    When collected:

        All current aliens are instantly destroyed.

        The player earns bonus points.

        The game advances immediately to the next level.

    If the player misses the bomb (i.e. it leaves the screen), no replacement appears until another purple alien is destroyed.

📈 Level Progression

Each level increases the difficulty in a predictable and gradual way:

    Alien movement speed increases.

    Ball speed increases slightly.

    Alien reinforcements per level may increase, introducing more rows overall.

    Each level begins with a new alien formation and a new set of reinforcements.

To complete a level, the player must:

    Either destroy all aliens after all reinforcements are used up.

    Or collect the bomb and skip the remaining fight.

❤️ Lives and Rewards

    The player starts with a limited number of lives (e.g., 3).

    Losing the ball reduces the life count by one.

    If the player completes a level without losing any lives during that level, they are rewarded with an extra life.

    The player can accumulate multiple extra lives but up to a reasonable maximum (e.g., 9).

    The game ends if:

        The player runs out of lives, or

        An alien reaches the paddle (even if lives remain).

🏆 High Score System

    At the end of the game, if the player’s score qualifies for the top records, they are prompted to enter their name or initials.

    A persistent leaderboard is maintained, tracking:

        Player name or initials.

        Score.

        Date of the score (if desired).

    The high score list is saved between sessions and keeps the top 10 scores in descending order.

🖼️ Visuals and UI Feedback

    Aliens are visually differentiated by color. The point values and hues are:
        • Yellow – 10 points (most common)
        • Green – 20 points (less common)
        • Red – 50 points (uncommon)
        • Purple – 100 points (rarest)

    Visual effects should accompany:

        Ball impacts.

        Alien destruction.

        Bomb pickup explosion.

        Level transitions.

    A status bar at the top of the screen shows:

        Current score.

        Remaining lives.

        Current level.

        Number of alien reinforcements remaining.

        Bomb availability (spawned by destroying purple aliens).

✅ Summary of Win and Loss Conditions

    Level Win: All aliens destroyed and no reinforcements remain, or a bomb is collected.

    Level Loss: Not possible — you continue until game over.

    Game Over occurs when:

        The player has no more lives.

        An alien reaches the paddle line.
