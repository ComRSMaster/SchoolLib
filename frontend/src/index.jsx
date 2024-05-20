import {render} from 'preact';
import {LocationProvider, Router, Route} from 'preact-iso';

// import { Header } from './components/Header.jsx';
// import { Home } from './pages/Home/index.jsx';
// import { NotFound } from './pages/_404.jsx';
// import './style.css';

// export function App() {
// 	return (
// 		<LocationProvider>
// 			<Header />
// 			<main>
// 				<Router>
// 					<Route path="/" component={Home} />
// 					<Route default component={NotFound} />
// 				</Router>
// 			</main>
// 		</LocationProvider>
// 	);
// }

import * as React from 'react';
import {styled, createTheme, ThemeProvider} from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import {mainListItems, adminListItems} from './listItems';
import BookCard from './components/BookCard.jsx';
import Grid from "@mui/material/Grid";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({theme, open}) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, {shouldForwardProp: (prop) => prop !== 'open'})(
    ({theme, open}) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

const itemData = [
    {
        img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
        title: 'Breakfast',
    },
    {
        img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
        title: 'Burger',
    },
    {
        img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
        title: 'Camera',
    },
    {
        img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
        title: 'Coffee',
    },
    {
        img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
        title: 'Hats',
    },
    {
        img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
        title: 'Honey',
    },
    {
        img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
        title: 'Basketball',
    },
    {
        img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
        title: 'Fern',
    },
    {
        img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
        title: 'Mushrooms',
    },
    {
        img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
        title: 'Tomato basil',
    },
    {
        img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
        title: 'Sea star',
    },
    {
        img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
        title: 'Bike',
    },
];

export function App() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <LocationProvider>
            <ThemeProvider theme={defaultTheme}>
                <Box sx={{display: 'flex'}}>
                    <CssBaseline />
                    <AppBar position="absolute" open={open}>
                        <Toolbar
                            sx={{
                                pr: '24px', // keep right padding when drawer closed
                            }}
                        >
                            <IconButton
                                edge="start"
                                color="inherit"
                                aria-label="open drawer"
                                onClick={toggleDrawer}
                                sx={{
                                    marginRight: '36px',
                                    ...(open && {display: 'none'}),
                                }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Typography
                                component="h1"
                                variant="h6"
                                color="inherit"
                                noWrap
                                sx={{flexGrow: 1}}
                            >
                                Библиотека ФТШ
                            </Typography>
                        </Toolbar>
                    </AppBar>
                    <Drawer variant="permanent" open={open}>
                        <Toolbar
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                px: [1],
                            }}
                        >
                            <IconButton onClick={toggleDrawer}>
                                <ChevronLeftIcon />
                            </IconButton>
                        </Toolbar>
                        <Divider />
                        <List component="nav">
                            {mainListItems}
                            <Divider sx={{my: 1}} />
                            {adminListItems}
                        </List>
                    </Drawer>
                    <Box
                        component="main"
                        sx={{
                            backgroundColor: (theme) =>
                                theme.palette.mode === 'light'
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            flexGrow: 1,
                            height: '100vh',
                            overflow: 'auto',
                        }}
                    >
                        <Toolbar />
                        <Container maxWidth="lg" sx={{mt: 4, mb: 4}}>
                            <ImageList cols={3} gap={20}>
                                {itemData.map((item) => (
                                    <BookCard />
                                ))}
                            </ImageList>

                            {/*/!* Chart *!/*/}
                            {/*<Grid item xs={12} md={8} lg={9}>*/}
                            {/*  <Paper*/}
                            {/*    sx={{*/}
                            {/*      p: 2,*/}
                            {/*      display: 'flex',*/}
                            {/*      flexDirection: 'column',*/}
                            {/*      height: 240,*/}
                            {/*    }}*/}
                            {/*  >*/}
                            {/*    /!*<Chart />*!/*/}
                            {/*  </Paper>*/}
                            {/*</Grid>*/}
                            {/*/!* Recent Deposits *!/*/}
                            {/*<Grid item xs={12} md={4} lg={3}>*/}
                            {/*  <Paper*/}
                            {/*    sx={{*/}
                            {/*      p: 2,*/}
                            {/*      display: 'flex',*/}
                            {/*      flexDirection: 'column',*/}
                            {/*      height: 240,*/}
                            {/*    }}*/}
                            {/*  >*/}
                            {/*    /!*<Deposits />*!/*/}
                            {/*  </Paper>*/}
                            {/*</Grid>*/}
                            {/*/!* Recent Orders *!/*/}
                            {/*<Grid item xs={12}>*/}
                            {/*  <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>*/}
                            {/*    /!*<Orders />*!/*/}
                            {/*  </Paper>*/}
                            {/*</Grid>*/}
                        </Container>
                    </Box>
                </Box>
            </ThemeProvider>
        </LocationProvider>
    );
}

render(<App />, document.getElementById('app'));