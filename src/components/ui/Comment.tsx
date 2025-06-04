import React from "react";
import { Paper, Typography, TextField } from "@mui/material";

interface CommentProps {
  comment: string;
  setComment: (value: string) => void;
  editMode?: boolean;
}

export const Comment: React.FC<CommentProps> = ({
  comment,
  setComment,
  editMode = true,
}) => {
  return (
    <Paper elevation={1} sx={{ p: 2, my: 3 }}>
      <Typography variant="h4" mb={3}>
        My thoughts
      </Typography>
      {editMode ? (
        <TextField
          multiline
          minRows={2}
          value={comment || ""}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          placeholder="Add a comment about this book"
        />
      ) : (
        <Typography
          variant="body1"
          sx={{
            minHeight: 70,
            border: "1px solid",
            borderColor: "primary.main",
            borderRadius: 1,
            p: 2,
            whiteSpace: "pre-line",
            wordBreak: "break-word",
            overflowWrap: "break-word",
          }}
        >
          {comment}
        </Typography>
      )}
    </Paper>
  );
};
