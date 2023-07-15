import React from 'react';
import {
  Skills,
  MicroCampLandingHeader,
  InThisCohortContainer,
  Testimonials,
  NotAnotherTechCourse,
  ContextBasedLearning,
  MicrocampPricing,
  WhatWeDoForYou,
  WeTaughtAt,
  SEO,
} from '@/components';
import { PageProps } from '@/interfaces';
import {
  getMicrocampPageData,
  getPreFetchProps,
  getSkillsBySlug,
} from '@/utils';

const MicroCampLanding = ({ slug, seoMeta }: PageProps) => {
  const microcampData = getMicrocampPageData(slug);
  if (!microcampData) return;

  const { header, inThisCohort, offerings } = microcampData;

  // console.log(offerings);

  return (
    <React.Fragment>
      <SEO seoMeta={seoMeta} />
      <MicroCampLandingHeader {...header} />
      <InThisCohortContainer {...inThisCohort} />
      <Skills skills={getSkillsBySlug(slug)} />
      <WhatWeDoForYou offerings={offerings} />
      <NotAnotherTechCourse />
      <ContextBasedLearning />
      <MicrocampPricing />
      <WeTaughtAt />
      <Testimonials />
    </React.Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default MicroCampLanding;
