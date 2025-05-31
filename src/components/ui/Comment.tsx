import React from "react";
import { Box, Paper, Typography, TextField } from "@mui/material";

interface CommentProps {
  comment: string;
  setComment: (value: string) => void;
  editMode: boolean;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  setComment,
  editMode,
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        my: 3,
      }}
    >
      <Typography variant="h3" mb={3}>
        My thoughts
      </Typography>
      {editMode ? (
        <TextField
          multiline
          minRows={2}
          value={comment || ""} // Ensure comment is a string to avoid uncontrolled to controlled component warning
          //on change, the new value is set to the comment state
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          placeholder="Add a comment about this book"
        />
      ) : (
        <Box
          minHeight={70}
          display="flex"
          alignItems="center"
          sx={{
            border: "1px solid",
            borderColor: "divider",
            borderRadius: 1,
            p: 2,
          }}
        >
          <Typography>{comment}</Typography>
        </Box>
      )}
    </Paper>
  );
};
