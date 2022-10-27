import React, { useRef, useLayoutEffect } from 'react';
import { Route, Routes } from "react-router-dom";

import { Container } from '@mui/material';

import Banner from './Banner';
import Home from './pages/Home';
import Token from './pages/Token';
import Identities from './pages/Identities';
import PageNotFound from './PageNotFound';

const PageLayout = () => {

    const refContentContainer = useRef<HTMLDivElement>(null);

    const sizeContentContainenr = () => {
        let contentContainerPosition = refContentContainer.current.getBoundingClientRect().top;
        let bottomPadding = 10;
        let contentContainerHeight = (window.innerHeight - contentContainerPosition - bottomPadding) + "px"
        refContentContainer.current.style.minHeight = contentContainerHeight;
    };

    useLayoutEffect(() => {
        sizeContentContainenr();
        window.addEventListener("resize", sizeContentContainenr);
    });

    return (
        <Container maxWidth={"lg"} >
            <Banner />
            <Container sx={{ border: 1 }} ref={refContentContainer} >
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="token" element={<Token />} />
                    <Route path="identities" element={<Identities />} />
                    <Route path="*" element={<PageNotFound />} />
                </Routes>
            </Container>
        </Container>
    )
}

export default PageLayout