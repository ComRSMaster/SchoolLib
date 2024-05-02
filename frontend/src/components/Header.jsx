import { useLocation } from 'preact-iso';

import {useState} from 'preact/hooks';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

export function Header() {
	const { url } = useLocation();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => setValue(newValue);

	return (
        <Box sx={{width: '100%', typography: 'body1'}}>
            <TabContext value={value}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <TabList onChange={handleChange} centered>
                        <Tab label="Главная" value="1"/>
                        <Tab label="Избранное" value="2"/>
                        <Tab label="Профиль" value="3"/>
                    </TabList>
                </Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
            </TabContext>
        </Box>
		// <header>
		// 	<nav>
		// 		<a href="/" class={url == '/' && 'active'}>
		// 			Home
		// 		</a>
		// 		<a href="/404" class={url == '/404' && 'active'}>
		// 			404
		// 		</a>
		// 	</nav>
		// </header>
	);
}
