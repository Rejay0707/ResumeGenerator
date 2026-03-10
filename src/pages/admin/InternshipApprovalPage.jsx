export default function InternshipApprovalPage({
  applications,
  onApprove,
  onReject,
  onUploadLetter,
}) {
  return (
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Internship Approvals</h2>

      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th>Student</th>
            <th>Internship</th>
            <th>Resume</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {applications.map((app) => (
            <tr key={app.application_id}>
              <td>{app.student.name}</td>
              <td>{app.internship.title}</td>

              <td>
                <a
                  href={`https://www.scratchprod.in/resume-generator-backend/storage/${app.resume_url}`}
                  target="_blank"
                >
                  View Resume
                </a>
              </td>

              <td className="space-x-2">
                <button
                  onClick={() => onApprove(app.application_id)}
                  className="bg-green-600 text-white px-2 py-1"
                >
                  Approve
                </button>

                <button
                  onClick={() => onReject(app.application_id)}
                  className="bg-red-600 text-white px-2 py-1"
                >
                  Reject
                </button>

                <input
                  type="file"
                  onChange={(e) =>
                    onUploadLetter(app.application_id, e.target.files[0])
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}