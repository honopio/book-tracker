import React from "react";
import { Paper, Typography, TextField } from "@mui/material";

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
      <TextField
        multiline
        minRows={2}
        value={comment || ""}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
        placeholder="Add a comment about this book"
        slotProps={{ htmlInput: { readOnly: !editMode } }}
      />
    </Paper>
  );
};
