import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BlurLinearIcon from '@mui/icons-material/BlurLinear';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import Toolbar from '@mui/material/Toolbar';
import { makeStyles } from '@mui/styles';
import PluginContainer from '../components/plugin/PluginsContainer';
import SideBar from '../components/sideBar/SideBar';
import { Routes, Route } from 'react-router-dom';
import { get, put } from '../services/fetch';

const drawerWidth = 400;

const useStyles = makeStyles((theme) => ({
    headerName: {
        flexGrow: 1,
        textAlign: "center",
        margin: "auto",
        padding: "20px"
    },
    boldHeaderName: {
        fontWeight: "800"
    },
    mainContainer: {
        paddingLeft: '20px'
    }
}));

const menuItems = [
    { name: 'Marketing', icon: <BlurLinearIcon />, route: "/marketing" },
    { name: 'Finance', icon: <MonetizationOnIcon />, route: "/finance" },
    { name: 'Personnel', icon: <PlaylistAddCheckIcon />, route: "/personal" }
]

function Home(props) {

    const [tabsData, setTabsData] = React.useState({})
    const [plugins, setPlugins] = React.useState({})
    const [pluginsDisabled, setPluginsDisabled] = React.useState(false)


    const classes = useStyles();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleAllSelect = (event) => {
        setPluginsDisabled(!event.target.checked);
    }

    const addPlugin = (data) => {
        const newTabsData = { ...tabsData }
        newTabsData[data.tabName].active = [...tabsData[data.tabName].active, data.pluginName]
        newTabsData[data.tabName].inactive = tabsData[data.tabName].inactive.filter(inactive => inactive !== data.pluginName)
        setTabsData(newTabsData)
        return newTabsData[data.tabName]
    }

    const removePlugin = (data) => {
        const newTabsData = { ...tabsData }
        newTabsData[data.tabName].active = tabsData[data.tabName].active.filter(active => active !== data.pluginName)
        newTabsData[data.tabName].inactive = [...tabsData[data.tabName].inactive, data.pluginName]
        setTabsData(newTabsData)
        return newTabsData[data.tabName]
    }

    const handlePluginActivation = async (data) => {
        if (data.activate) {
            const newTabsData = addPlugin(data);
            await put(`/tabs/${newTabsData.id}`, newTabsData)
        } else {
            const newTabsData = removePlugin(data);
            await put(`/tabs/${newTabsData.id}`, newTabsData)
        }
    }

    React.useEffect(() => {
        const fetchAllData = async () => {
            const [tabs, plugins] = await Promise.all([
                get('/tabs'),
                get('/plugins'),
            ]);
            const tabsDataMap = Object.fromEntries(tabs.map(tab => [tab.name, tab]))
            const pluginsDataMap = Object.fromEntries(plugins.map(plugin => [plugin.name, plugin]))
            setTabsData(tabsDataMap)
            setPlugins(pluginsDataMap)
        }
        fetchAllData()
    }, [])

    const commonProps = { handleDrawerToggle, tabdata: tabsData, plugins, pluginDisabled: pluginsDisabled, handlePluginActivation }
    return (
        <Box sx={{ display: 'flex' }} className={classes.mainContainer}>
            <CssBaseline />
            <SideBar {...{ onAllSelect: handleAllSelect, handleDrawerToggle, menuItems, mobileOpen, drawerWidth, pluginsDisabled, ...props }}></SideBar>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Routes>
                    <Route path="/" element={<PluginContainer {...commonProps} title='Marketing Plugins' name="tab1" />} />
                    <Route path="marketing" element={<PluginContainer {...commonProps} title='Marketing Plugins' name="tab1" />} />
                    <Route path="finance" element={<PluginContainer {...commonProps} title='Finance Plugins' name="tab2" />} />
                    <Route path="personal" element={<PluginContainer {...commonProps} title='Personal Plugins' name="tab3" />} />
                </Routes>
            </Box>
        </Box>
    );
}

Home.propTypes = {
    window: PropTypes.func,
};

export default Home;
