import { Card, CardContent, Link, Typography } from "@mui/material";

const DependencyCard = ({ name, url }) => {
  return (
    <Card sx={{ minWidth: 100, margin: "8px" }}>
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          <Link href={url} target="_blank" rel="noopener noreferrer">
            {name}
          </Link>
        </Typography>
      </CardContent>
    </Card>
  );
};

export default DependencyCard;
