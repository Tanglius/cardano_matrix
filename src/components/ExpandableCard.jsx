import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Collapse,
  Grid,
  IconButton,
  Link,
  Typography,
} from "@mui/material";

import DependencyCard from "./DependencyCard";

const ExpandableCard = ({
  title,
  description,
  website,
  tags,
  releases,
  onExpand,
  expanded,
}) => {
  const handleExpandClick = () => {
    onExpand(title);
  };

  return (
    <Card
      sx={{
        marginBottom: 2,
        borderRadius: "16px",
        boxShadow: expanded
          ? "0px 4px 20px rgba(0, 0, 0, 0.1)"
          : "0px 2px 10px rgba(0, 0, 0, 0.05)",
        width: expanded ? "100%" : "auto",
        margin: expanded ? "0 auto" : undefined,
        transition: "all 0.3s ease-in-out",
        position: "relative",
        height: "100%",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography
              variant="h6"
              component="div"
              sx={{ fontWeight: "bold" }}
            >
              {title}
            </Typography>

            <IconButton
              aria-label="add to favorites"
              sx={{
                position: "absolute",
                top: "8px",
                right: "8px",
                color: "#e91e63",
              }}
            >
              <FavoriteIcon />
            </IconButton>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ marginTop: "8px" }}
            >
              {description}
            </Typography>

            <Link
              href={website}
              target="_blank"
              rel="noopener noreferrer"
              variant="body2"
              sx={{ marginTop: 1, display: "block" }}
            >
              Visit Website
            </Link>

            <div style={{ marginTop: "16px" }}>
              {tags.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{
                    marginRight: "4px",
                    backgroundColor: tagColor(tag),
                    color: "#fff",
                    fontSize: "0.75rem",
                    fontWeight: "500",
                  }}
                />
              ))}
            </div>
          </Grid>
        </Grid>
      </CardContent>

      <CardActions
        disableSpacing
        sx={{ justifyContent: "space-between", padding: "16px" }}
      >
        <Button
          size="small"
          variant="contained"
          color="primary"
          onClick={handleExpandClick}
          sx={{ borderRadius: "8px", textTransform: "none" }}
        >
          {expanded ? "Hide dependencies" : "Show dependencies"}{" "}
          {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
        </Button>
      </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {releases && (
            <>
              <Typography variant="h6" sx={{ marginTop: "16px" }}>
                Releases
              </Typography>

              {releases.map((release, index) => (
                <div key={index} style={{ marginBottom: "8px" }}>
                  <Typography variant="subtitle1">
                    Version: {release.version} {release.latest && "(Latest)"}
                  </Typography>

                  <Grid
                    container
                    spacing={2}
                    direction="row"
                    alignItems="center"
                  >
                    {release.dependencies.map((dependency, depIndex) => (
                      <Grid container direction="row" item key={depIndex}>
                        <DependencyCard
                          name={dependency.name}
                          url={dependency.url}
                        />
                      </Grid>
                    ))}
                  </Grid>

                  <Typography variant="body2">
                    Traits: {release.traits.join(", ")}
                  </Typography>
                </div>
              ))}
            </>
          )}
        </CardContent>
      </Collapse>
    </Card>
  );
};

const tagColor = (tag) => {
  const colors = {
    favorite: "#e91e63",
    api: "#009688",
    library: "#3f51b5",
    java: "#f44336",
    cli: "#795548",
  };

  return colors[tag] || "#607d8b";
};

export default ExpandableCard;
