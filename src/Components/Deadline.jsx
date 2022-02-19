import { Box, LinearProgress } from "@mui/material";


function calculateDealine(props) {
    return 100 - ((props.time / props.totalTime) * 100)
}
function Deadline(props) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box sx={{ width: '100%', mr: 1, px: 15 }}>
                <LinearProgress variant="determinate" value={calculateDealine(props)} color="error" sx={{ height: '8px', borderRadius: '25px' }} />
            </Box>
        </Box>
    )
}

export default Deadline;