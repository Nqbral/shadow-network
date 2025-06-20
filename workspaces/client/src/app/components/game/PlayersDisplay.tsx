import { Player } from '@shadow-network/shared/classes/Player';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';

import PlayerDisplay from './player/PlayerDisplay';

type Props = {
  gameState: ServerPayloads[ServerEvents.GameState] | null;
  myPlayer: Player | undefined;
};

export default function PlayersDisplay({ gameState, myPlayer }: Props) {
  return (
    <div className="flex w-full flex-row flex-wrap justify-center gap-1 sm:gap-2 md:gap-4 lg:gap-6">
      {gameState?.players
        .filter((player) => player.userId !== myPlayer?.userId)
        .map((player, index) => {
          return (
            <PlayerDisplay key={`player-display-${index}`} player={player} />
          );
        })}
    </div>
  );
}
