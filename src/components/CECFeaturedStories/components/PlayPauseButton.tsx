/* ======================================================================== *
 * Copyright 2026 HCL America Inc.                                          *
 * Licensed under the Apache License, Version 2.0 (the "License");          *
 * you may not use this file except in compliance with the License.         *
 * You may obtain a copy of the License at                                  *
 *                                                                          *
 * http://www.apache.org/licenses/LICENSE-2.0                               *
 *                                                                          *
 * Unless required by applicable law or agreed to in writing, software      *
 * distributed under the License is distributed on an "AS IS" BASIS,        *
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. *
 * See the License for the specific language governing permissions and      *
 * limitations under the License.                                           *
 * ======================================================================== */
// src/components/CECFeaturedStories/components/PlayPauseButton.tsx
import React, { useEffect } from 'react';
interface PlayPauseButtonProps {
    isPlaying: boolean;
    onClick: () => void;
    className?: string;
}
const PlayPauseButton: React.FC<PlayPauseButtonProps> = ({
                                                             isPlaying,
                                                             onClick,
                                                             className = ''
                                                         }) => {
    // Handle keyboard spacebar press for play/pause
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space' && document.activeElement === document.body) {
                e.preventDefault();
                onClick();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClick]);
    return (
        <button
            className={`cec-play-pause-button ${className} ${isPlaying ? 'is-playing' : ''}`}
            onClick={onClick}
            onKeyDown={(e) => {
                // Allow space/enter to trigger the button
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    onClick();
                }
            }}
            aria-label={isPlaying ? 'Pause slideshow (Space)' : 'Play slideshow (Space)'}
            title={isPlaying ? 'Pause' : 'Play'}  //Added title to play/pause button
        >
            {isPlaying ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3.3335 1.99992C3.3335 1.63173 3.63198 1.33325 4.00016 1.33325H6.00016C6.36835 1.33325 6.66683 1.63173 6.66683 1.99992V13.9999C6.66683 14.3681 6.36835 14.6666 6.00016 14.6666H4.00016C3.63198 14.6666 3.3335 14.3681 3.3335 13.9999V1.99992Z" fill="currentColor"/>
                  <path d="M9.3335 1.99992C9.3335 1.63173 9.63196 1.33325 10.0002 1.33325H12.0002C12.3684 1.33325 12.6668 1.63173 12.6668 1.99992V13.9999C12.6668 14.3681 12.3684 14.6666 12.0002 14.6666H10.0002C9.63196 14.6666 9.3335 14.3681 9.3335 13.9999V1.99992Z" fill="currentColor"/>
                </svg>
            ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.4 14.5533C2.52667 14.6266 2.67333 14.6666 2.81333 14.6666C2.94667 14.6666 3.08 14.6266 3.20667 14.5599L13.5 8.85325C13.8133 8.67325 14 8.35992 14 7.99992C14 7.63992 13.8133 7.31992 13.5 7.14659L3.20667 1.43324C2.95333 1.29324 2.65333 1.29991 2.4 1.44657C2.14667 1.59324 2 1.85324 2 2.14657V13.8533C2 14.1466 2.14667 14.4066 2.4 14.5533Z" fill="currentColor"/>
                </svg>
            )}
        </button>
    );
};
export default PlayPauseButton;
