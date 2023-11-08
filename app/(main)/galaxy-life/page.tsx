'use client'
import React, { useState, useEffect, useRef } from "react";
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { Viewer, Worker } from '@react-pdf-viewer/core';
import { defaultLayoutPlugin } from '@react-pdf-viewer/default-layout';

function GalaxyLife() {
  const defaultLayoutPluginInstance = defaultLayoutPlugin();

  const [selectedIssue, setSelectedIssue] = useState("issue_2"); // Default issue number

  const handleIssueChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedIssue(e.target.value);
  };

  // useEffect(() => {
  //   // Perform any additional actions or updates when the selected issue changes.
  //   // You can load data specific to the selected issue here.
  // }, [selectedIssue]); 

  return (
    <>
    <div className="mx-6 my-20 lg:my-32 lg:mx-40">
      <label htmlFor="issue_select" className="sr-only">
        Choose an issue
      </label>
      <select
        id="issue_select"
        className="block py-2.5 px-0 w-full text-md text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
        value={selectedIssue}
        onChange={handleIssueChange}
        style={{ color: 'black' }} // Add this inline style
      >
        <option value="issue_1">December/January 2023</option>
        <option value="issue_2">September/October 2023</option>
      </select>
      <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.js">
        <div className="lg:mt-8 mt-4 lg:m-0 m-4">
          <div
            style={{
              border: '1px solid rgba(0, 0, 0, 0.3)',
              height: '750px',
            }}
            className="rounded-lg bg-white dark:bg-gray-800 p-4"
          >
            <Viewer
              fileUrl={`./magazines/${selectedIssue}.pdf`}
              plugins={[
                defaultLayoutPluginInstance,
              ]}
            />
          </div>
        </div>
      </Worker>
    </div>
    </>
  );
}

export default GalaxyLife;