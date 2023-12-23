"use client"
import React, { useEffect, useState } from 'react';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Button } from "@nextui-org/react";
import Link from "next/link";

export const revalidate = 0


const columns = [
  { key: "Rank", label: "Rank" },
  { key: "User-Email", label: "Username" },
  { key: "Score", label: "Score" },
  { key: "Date", label: "Date" },
];

const options = {
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric',
} as Intl.DateTimeFormatOptions;



const TableComponent = ({scores}:any)=>{
  
  return (
 
    <Table aria-label="Example table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {scores.map((row:any, index:any) => (
          <TableRow key={row.score_id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell><Link className="underline flex gap-2 " href={`/profile/${row.username}`}>{row.username}</Link></TableCell>
            <TableCell>
              {row.score}
            </TableCell>
            <TableCell>
              {row.score_date ? new Date(row.score_date).toLocaleString('en-us', options) : '--'}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TableComponent;