import React, { useState } from 'react';
import { Grid, Drawer, IconButton, useMediaQuery } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Sidebar } from '../../shared/Sidebar';
import { Navbar } from '../../shared/Navbar';

export const DashboardLayout = ({ children }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const isSmallScreen = useMediaQuery('(max-width:700px)');

    const handleDrawerToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <Grid>
            {/* Navbar */}
            <Grid item xs={12}>
                <Navbar />
            </Grid>
            {isSmallScreen && (
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    style={{ margin: '.5rem' }}
                >
                    <MenuIcon style={{ fontSize: '2rem'}}/>
                </IconButton>
            )}
            <div style={{ display: 'flex', flexDirection: 'row', widt:'100vw' }}>
                {isSmallScreen ? (
                    <Drawer
                        variant='temporary'
                        anchor="left"
                        open={isSidebarOpen}
                        onClose={handleDrawerToggle}
                        sx={{ width: 250}}
                        PaperProps={{ style: { width: 250 } }}
                        ModalProps={{ keepMounted: true }}
                    >
                        <Sidebar />
                    </Drawer>
                ) : (
                    <Sidebar />
                )}
                {/* Contenido principal */}
                <main>
                    {children}
                </main>
            </div>
            <style>
                {
                    `
                    main {
                        width: calc(100vw - 250px);
                        padding: 1rem;
                    }

                    @media (max-width: 700px) {
                        main {
                            width: 100vw;
                        }
                    }
                    `
                }
            </style>
        </Grid>
    );
};