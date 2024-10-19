import React, { Fragment } from 'react';
import { PageProps, PrimaryCardWithCTAProps } from '@/interfaces';
import {
  SEO,
  CardContainerB,
  LoadingSpinner,
  FlexContainer,
  Text,
  LinkButton,
} from '@/components';
import { useAPIResponseMapper, useApi } from '@/hooks';
import { getPreFetchProps, mapCourseResponseToCard } from '@/utils';
import { routes } from '@/constant';

const Home = ({ seoMeta }: PageProps) => {
  const { response, loading } = useApi('shiksha', {
    url: routes.api.qns,
  });

  const courses: PrimaryCardWithCTAProps[] = useAPIResponseMapper(
    response?.data,
    mapCourseResponseToCard
  );

  if (loading) {
    return <LoadingSpinner />;
  }
  const questions: PrimaryCardWithCTAProps[] = [
    {
      content: 'explore ReactJs Question...',
      href: `/shiksha/explore/ReactJs`,
      noImage: true,
      id: 'ReactJs',
      // image: "ReactJs",
      // imageAltText: 'ReactJS Image',
      title: 'ReactJs ',
      borderColour: 1,
      ctaText: "See Question",
      active: true
    },
    {
      content: 'Explore NextJs Question...',
      href: '/shiksha/explore/NextJs',
      noImage: true,
      id: 'NextJs',
      // image: "NextJs",
      // imageAltText: 'NextJS Image',
      title: 'NextJs',
      borderColour: 2,
      ctaText: 'See Question',
      active: true,

    }, {
      content: 'Explore NodeJs Question...',
      href: '/shiksha/explore/NodeJs',
      noImage: true,
      id: 'NodeJs',
      // image: "NodeJs",
      // imageAltText: 'NodeJS Image',
      title: 'NodeJs',
      borderColour: 3,
      ctaText: 'See Question',
      active: true,
    }
  ]
  const noCourseFoundUI = (!questions || questions.length === 0) && (
    <FlexContainer
      justifyCenter={true}
      className='w-screen h-screen item-center justify-center flex-col'
    >
      <Text level='h1' className='heading-4 mb-3'>
        Oops! No Courses found.
      </Text>
      <LinkButton
        buttonProps={{
          variant: 'PRIMARY',
          text: 'Go Back To Home',
        }}
        href={routes.shiksha}
      ></LinkButton>
    </FlexContainer>
  );

  return (
    <Fragment>
      <SEO seoMeta={seoMeta} />
      <CardContainerB
      
        heading='Explore'
        focusText='Questions'
        cards={questions}
        borderColour={2}
        subtext='Pick A Course and Start Learning'
        sectionClassName='px-2 py-4'
      />
      {noCourseFoundUI}
    </Fragment>
  );
};

export const getServerSideProps = getPreFetchProps;

export default Home;
