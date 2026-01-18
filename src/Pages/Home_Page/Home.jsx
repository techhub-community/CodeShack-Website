import { React, useState } from "react";
import { LandingLayout } from "../../assets/LandindLayout";
import { Hero } from "./Hero_Section/Hero";
import { About } from "./About_Section/About";
import { Event } from "./Event_Section/Event";

export const Home = () => {
  return (
    <>
      <LandingLayout>
        <Hero />
        <About />
        <Event />
      </LandingLayout>
    </>
  );
};
