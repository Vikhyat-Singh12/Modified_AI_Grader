import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";

const gradeData = [
  { grade: "A", students: 15 },
  { grade: "B", students: 25 },
  { grade: "C", students: 30 },
  { grade: "D", students: 10 },
  { grade: "F", students: 5 },
];

const improvementAreas = [
  { name: "Mathematics", value: 40 },
  { name: "Science", value: 30 },
  { name: "English", value: 20 },
  { name: "History", value: 10 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

function FeedbackAnalytics() {
  return (
    <div className="container mx-auto p-6">
      {/* Page Header */}
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Feedback & Analytics</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Class Performance Overview */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Class Performance Overview</h3>
          <p className="text-gray-700">📊 Class Average Score: <strong>78%</strong></p>
          <p className="text-gray-700">🎯 Top Performing Subject: <strong>Science</strong></p>
          <p className="text-gray-700">⚠️ Areas for Improvement: <strong>Mathematics</strong></p>
        </div>

        {/* Grade Distribution Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-semibold mb-4">Grade Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={gradeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="grade" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Subject-Wise Improvement Chart */}
        <div className="bg-white p-6 rounded-lg shadow-lg col-span-1 md:col-span-2">
          <h3 className="text-xl font-semibold mb-4">Improvement Areas</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={improvementAreas} cx="50%" cy="50%" outerRadius={100} fill="#8884d8" dataKey="value">
                {improvementAreas.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FeedbackAnalytics;
