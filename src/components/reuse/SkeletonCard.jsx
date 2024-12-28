import React from 'react';
import { Box, Skeleton, Typography } from '@mui/material';

const SkeletonStatCard = ({ color = '#6366F1' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 2,
        bgcolor: '#1F2937',
        color: 'white',
        borderRadius: 2,
        boxShadow: `0 4px 10px 0 rgba(0,0,0,0.1)`,
      }}
    >
      {/* Icon Skeleton */}
      <Skeleton
        variant="circular"
        width={50}
        height={50}
        sx={{
          bgcolor: color,
        }}
      />

      {/* Text Skeleton */}
      <Box sx={{ textAlign: 'right', flex: 1, ml: 2 }}>
        <Skeleton variant="text" width="60%" height={20} />
        <Skeleton variant="text" width="40%" height={25} sx={{ mt: 1 }} />
      </Box>
    </Box>
  );
};

export default SkeletonStatCard;
