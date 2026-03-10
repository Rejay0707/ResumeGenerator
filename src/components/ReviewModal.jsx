import { useState } from "react";

export default function ReviewModal({ submission, onClose, onSubmit }) {
  const [status, setStatus] = useState("approved");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = () => {
    onSubmit(submission.id, {
      type: submission.type,
      status,
      feedback,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white p-5 rounded w-96">
        <h3 className="font-semibold mb-2">Review Submission</h3>

        <p className="mb-2">{submission.title}</p>

        <select value={status} onChange={e => setStatus(e.target.value)}>
          <option value="approved">Approve</option>
          <option value="rejected">Reject</option>
        </select>

        <textarea
          placeholder="Feedback"
          value={feedback}
          onChange={e => setFeedback(e.target.value)}
          className="w-full border mt-2"
        />

        <div className="flex justify-end gap-2 mt-3">
          <button onClick={onClose}>Cancel</button>
          <button onClick={handleSubmit}>Submit</button>
        </div>
      </div>
    </div>
  );
}