import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import Box from "@mui/material/Box";


export default function MovieCard({ movie, onActionClick, actionStyle }) {




    return (
        <Card className="movie-card">
        <CardMedia
            component="img"
            sx={{ width: 300, height: 425, flexShrink: 0, objectFit: 'cover' }}
            image={movie.Poster !== 'N/A' ? movie.Poster : "https://media.istockphoto.com/id/1409329028/vector/no-picture-available-placeholder-thumbnail-icon-illustration-design.jpg?s=170667a&w=0&k=20&c=Q7gLG-xfScdlTlPGFohllqpNqpxsU1jy8feD_fob87U="}
            alt={`Poster for ${movie.Title}`}
        />
        <Box  sx={{ display: 'flex', flexDirection: 'column', flexGrow: 1, p: 1 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography 
                gutterBottom 
                variant="h6" 
                component="h2" 
                sx={{ 
                fontWeight: 'bold',
                // CSS for title truncation, since the title can be long and mess up the layout
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
                }}>
                {movie.Title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
                {movie.Year}
            </Typography>
            </CardContent>
            <CardActions sx={{ pl: 2}}>
                <Button 
                    size="small" 
                    variant={actionStyle.variant || "contained"} 
                    color={actionStyle.color || "primary"}
                    // The onClick handler calls the function passed down from the parent
                    onClick={() => onActionClick(movie)}
                >
                    {actionStyle.label === 'remove' ? 'Remove from Watchlist' :'Add to Watchlist' }
                </Button>
            </CardActions>
        </Box>


        </Card>
    )
}