// components/NavigationBottom.tsx
'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import ViewListIcon from '@mui/icons-material/ViewList';
import BarChartIcon from '@mui/icons-material/BarChart';

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0);
  const ref = React.useRef<HTMLDivElement>(null);

  return (
    <Box sx={{ pb: 7 }} ref={ref}>
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Tarefas" icon={<TaskAltIcon />} />
        <BottomNavigationAction label="Cronograma" icon={<ViewListIcon />} />
        <BottomNavigationAction label="Desempenho" icon={<BarChartIcon />} />
      </BottomNavigation>
    </Paper>
    </Box>
  );
}
