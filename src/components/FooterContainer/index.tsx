import React from 'react';

import Footer from './component';
import { FooterQuery } from './enhancers/query';
import { LikeMutation } from './enhancers/likeMutation';
import { PlaySongMutation } from './enhancers/playSongMutation';
import { FooterState } from './enhancers/redux';

export interface InputProps {
  className: string;
}

const EnhancedFooter = ({ className }: InputProps) => (
  <FooterState>
    {({ sourceMetadata, nextSong, previousSong, play, pause, playing }) => (
      <FooterQuery variables={sourceMetadata} skip={!sourceMetadata}>
        {queryResults => (
          <LikeMutation variables={sourceMetadata}>
            {likeCurrentSong => (
              <PlaySongMutation variables={sourceMetadata}>
                {playCurrentSong => (
                  <Footer
                    nowPlaying={
                      sourceMetadata &&
                      queryResults.data &&
                      queryResults.data.song
                    }
                    className={className}
                    onToggleLike={() => likeCurrentSong()}
                    playSong={() => playCurrentSong()}
                    nextSong={nextSong}
                    previousSong={previousSong}
                    play={play}
                    pause={pause}
                    playing={playing}
                  />
                )}
              </PlaySongMutation>
            )}
          </LikeMutation>
        )}
      </FooterQuery>
    )}
  </FooterState>
);

export default EnhancedFooter;
