import React from "react"

import type { Page } from '@/payload-types'
import { Hero } from "@/heros/MainHero"
import { LowImpactHero } from "@/heros/PageTitle"
import { MediumImpactBanner } from "@/heros/MediumImpactBanner"

export const RenderHero = (props: Page['hero']) => {
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
          type="pageTitle"
          richText={props.richText ?? null}
          media={props.media ?? null}
          links={props.links ?? []}
          title={props.title || undefined}
        />
      );
    }

    case "mediumImpact": {
      return (
        <MediumImpactBanner
          type="mediumImpact"
          richText={null}
          media={props.media ?? null}
          links={props.links ?? []}
          heading={props.heading || undefined}
          description={props.description || undefined}
          eyebrow={props.eyebrow || undefined}
        />
      );
    }

    default:
      return null;
  }
};