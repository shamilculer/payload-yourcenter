import React from "react"


import { Hero } from "@/heros/MainHero"
import { LowImpactHero } from "@/heros/PageTitle"
import { MediumImpactBanner } from "@/heros/MediumImpactBanner"
import type { Slide } from "@/heros/MainHero"

export type RenderHeroProps =
  | { type: "none" }
  | { type: "mainHero"; slides?: Slide[] }
  | { type: "pageTitle"; richText?: any; media?: any; links?: any }
  | { type: "mediumImpact"; richText?: any; media?: any; links?: any };

export const RenderHero = (props: RenderHeroProps) => {
  const { type } = props;

  if (!type || type === "none") return null;

  switch (type) {
    case "mainHero": {
      const slides = props.slides || [];
      return <Hero slides={slides} />;
    }

    case "pageTitle": {
      return (
        <LowImpactHero
          richText={props.richText ?? null}
          media={props.media ?? null}
          links={props.links ?? []}
        />
      );
    }

    case "mediumImpact": {
      return (
        <MediumImpactBanner
          richText={props.richText ?? null}
          media={props.media ?? null}
          links={props.links ?? []}
        />
      );
    }

    default:
      return null;
  }
};