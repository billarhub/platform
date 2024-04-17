import React from 'react';
import Link from 'next/link';
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
  Match as DefaultMatch,
} from '@g-loot/react-tournament-brackets';
import { useWindowSize } from '@/hooks/useWindowSize';
// import { matches } from '@/static/matches';
import useScreenSize from '@/hooks/useScreenSize';
import { useTranslations } from 'next-intl';

const CustomMatch = (props: any) => {
  return (
    <div style={{ fontSize: '20px', textTransform: 'uppercase' }}>
      <DefaultMatch {...props} />
    </div>
  );
};

const WhiteTheme = createTheme({
  textColor: { main: '#000000', highlighted: '#07090D', dark: '#3E414D' },
  matchBackground: { wonColor: '#D9D9D9', lostColor: '#D9D9D9' },
  score: {
    background: { wonColor: '#F26223', lostColor: '#F26223' },
    text: { highlightedWonColor: '#7BF59D', highlightedLostColor: '#ffffff' },
  },
  border: {
    color: 'transparent',
    highlightedColor: 'transparent',
  },
  roundHeader: { backgroundColor: '#D9D9D9', fontColor: '#fff' },
  connectorColor: '#000',
  connectorColorHighlight: '#000',
  svgBackground: '#fff',
});

interface ITournamentSingleBracketProps {
  locale: string;
  matches: any;
}

function TournamentSingleBracket({
  locale,
  matches,
}: ITournamentSingleBracketProps) {
  const commonTranslation = useTranslations('Common');
  const [width, height] = useWindowSize();
  const screenSize = useScreenSize();
  const finalWidth = Math.max(width - 500, screenSize === 'sm' ? 400 : 200);
  const finalHeight = Math.max(height - 50, 800);
  const tournamentId = sessionStorage.getItem('currentTournamentId');

  const handleEditBracket = () => {
    sessionStorage.setItem('selectedTournamentToEdit', tournamentId || '');
    sessionStorage.removeItem('currentTournamentId');
  }

  return (
    <div
      className={`flex flex-col justify-center items-center w-full h-full round-header score gap-5`}
    >
      <div className="flex justify-end items-center w-full h-auto">
        <Link
          className="text-black underline"
          href={`/${locale}/tournaments/${tournamentId}/schedule`}
          onClick={handleEditBracket}
        >
          {commonTranslation('editBracket')}
        </Link>
      </div>
      <SingleEliminationBracket
        matches={matches}
        matchComponent={CustomMatch}
        theme={WhiteTheme}
        options={{
          style: {
            roundHeader: {
              backgroundColor: WhiteTheme.roundHeader.backgroundColor,
              fontColor: WhiteTheme.roundHeader.fontColor,
            },
            connectorColor: WhiteTheme.connectorColor,
            connectorColorHighlight: WhiteTheme.connectorColorHighlight,
          },
        }}
        svgWrapper={({ children, ...props }: { children: React.ReactNode }) => (
          <SVGViewer width={finalWidth} bracketHeight={finalHeight} {...props}>
            {children}
          </SVGViewer>
        )}
      />
    </div>
  );
}

export default TournamentSingleBracket;
