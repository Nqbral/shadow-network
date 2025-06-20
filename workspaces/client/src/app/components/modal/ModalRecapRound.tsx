import PrimaryButton from '@components/buttons/PrimaryButton';
import { useSocket } from '@contexts/SocketContext';
import { Player } from '@shadow-network/shared/classes/Player';
import { CLIENT_EVENTS } from '@shadow-network/shared/consts/ClientEvents';
import { ServerEvents } from '@shadow-network/shared/enums/ServerEvents';
import { ServerPayloads } from '@shadow-network/shared/types/ServerPayloads';
import { useEffect, useState } from 'react';
import { MagnifyingGlass } from 'react-loader-spinner';

import ModalTemplate from './ModalTemplate';

type Props = {
  player: Player | undefined;
  gameState: ServerPayloads[ServerEvents.GameState] | null;
};

export default function ModalRecapRound({ player, gameState }: Props) {
  const [playersNotReady, setPlayersNotReady] = useState<Player[]>([]);
  const { emitEvent } = useSocket();

  const handleReady = () => {
    emitEvent(CLIENT_EVENTS.GAME_READY, undefined);
  };

  useEffect(() => {
    if (gameState != null) {
      setPlayersNotReady(gameState.players.filter((p) => !p.ready));
    }
  }, [gameState]);

  return (
    <ModalTemplate>
      <div className="flex flex-col items-center gap-2 text-center sm:gap-3 md:gap-6">
        <h2 className="text-secondary-hover pb-2 text-lg sm:text-2xl">
          Récapitulatif de la manche{' '}
          {gameState?.roundNumber && gameState.roundNumber - 1}
        </h2>
        <div className="flex flex-col items-center gap-4 text-xs sm:text-sm md:text-base">
          <div className="flex flex-row items-center justify-center gap-2">
            {gameState?.cardsDisplayedRound.map((card, index) => {
              return <></>;
            })}
          </div>
        </div>

        <div className="text-xs sm:text-sm md:text-base">En attente de :</div>
        <div className="text-xs sm:text-sm md:text-base">
          {playersNotReady.map((playersNotReady, index) => {
            if (index == 0) {
              return (
                <div
                  className="inline-block"
                  key={`player-not-ready-${playersNotReady.userId}`}
                >
                  <span className={`text-${playersNotReady.color}`}>
                    {playersNotReady.userName}
                  </span>
                </div>
              );
            }

            return (
              <div
                className="inline-block"
                key={`player-not-ready-${playersNotReady.userId}`}
              >
                {', '}
                <span className={`text-${playersNotReady.color}`}>
                  {playersNotReady.userName}
                </span>
              </div>
            );
          })}
        </div>
        {player?.ready ? (
          <MagnifyingGlass
            visible={true}
            height="80"
            width="80"
            glassColor="#ffffff00"
            color="oklch(87.9% 0.169 91.605)"
            ariaLabel="three-dots-loading"
          />
        ) : (
          <PrimaryButton buttonText="Prêt à jouer" onClick={handleReady} />
        )}
      </div>
    </ModalTemplate>
  );
}
