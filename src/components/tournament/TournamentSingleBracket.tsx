import React from 'react';
import {
  SingleEliminationBracket,
  Match,
  SVGViewer,
  createTheme,
  Match as DefaultMatch,
} from '@g-loot/react-tournament-brackets';
import { useWindowSize } from '@/hooks/useWindowSize';
import { matches } from '@/static/matches';
import useScreenSize from '@/hooks/useScreenSize';

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

function TournamentSingleBracket() {
  const [width, height] = useWindowSize();
  const screenSize = useScreenSize();
  const finalWidth = Math.max(width - 500, screenSize === 'sm' ? 400 : 200);
  const finalHeight = Math.max(height - 50, 800);

  return (
    <div
      className={`flex justify-center items-center w-full h-full round-header score max-w-[1000px]`}
    >
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
