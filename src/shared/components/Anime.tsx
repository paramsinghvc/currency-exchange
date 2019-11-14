import React, { FC, useCallback, useEffect, useRef } from "react";
import { Transition } from "react-transition-group";
import { TransitionStatus, TransitionProps } from "react-transition-group/Transition";
import anime, { AnimeParams } from "animejs";
import { callbackify } from "util";

function capitalize(s: string | undefined) {
  return s && s[0].toUpperCase() + s.slice(1);
}

export type AnimeProps = AnimeParams & {
  onEntering?: AnimeParams;
  onEntered?: AnimeParams;
  onExited?: AnimeParams;
  onExiting?: AnimeParams;
  initProps?: AnimeProps;
};

export const AnimeComp: FC<AnimeProps & { status: TransitionStatus }> = ({
  duration,
  children,
  status,
  onEntering,
  onEntered,
  onExited,
  onExiting,
  initProps,
  ...props
}) => {
  const childRef = useRef<HTMLElement>();

  const buildAnimeOptions = useCallback(
    (
      state: TransitionStatus,
      animeOptions: AnimeParams,
      options: Pick<AnimeProps, "onEntering" | "onEntered" | "onExited" | "onExiting">,
      callbackFn: () => void
    ) => {
      const stateIdentifier = "on" + capitalize(state);
      if (options[stateIdentifier]) {
        callbackFn();
        return { ...animeOptions, ...options[stateIdentifier] };
      }
      return animeOptions;
    },
    []
  );

  useEffect(() => {
    if (!childRef.current) return;

    let animeOptions = buildAnimeOptions(
      status,
      {
        targets: childRef.current as AnimeParams["targets"],
        duration,
        ...props
      },
      { onEntering, onEntered, onExited, onExiting },
      () => {
        if (childRef.current) {
          anime.remove(childRef.current);
        }
      }
    );
    if (initProps) {
      anime.set(childRef.current, initProps);
    }
    const animeRef = anime(animeOptions);
  }, [status, childRef, duration, initProps]);

  return (
    <>
      {React.Children.map(
        children,
        (child, i) =>
          React.isValidElement(child) &&
          React.cloneElement(child, {
            ref: childRef
          })
      )}
    </>
  );
};

const Anime: FC<
  Pick<TransitionProps, "mountOnEnter" | "unmountOnExit" | "appear"> &
    AnimeProps & {
      open: boolean;
      duration: number;
      initProps?: AnimeProps;
    }
> = ({ open, duration, children, mountOnEnter = true, unmountOnExit = true, appear = true, initProps, ...props }) => {
  return (
    <Transition mountOnEnter={mountOnEnter} unmountOnExit={unmountOnExit} appear={appear} in={open} timeout={duration}>
      {(status: TransitionStatus) => (
        <AnimeComp duration={duration} status={status} initProps={initProps} {...(props as AnimeProps)}>
          {children}
        </AnimeComp>
      )}
    </Transition>
  );
};

export default Anime;
