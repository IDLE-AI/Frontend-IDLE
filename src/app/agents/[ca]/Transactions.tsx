import React from 'react'
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"


export default function Transactions() {
    return (
        <Table>
            <TableCaption>A list of all recent Transactions in NAMA TOKEN.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Address</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>IDLE</TableHead>
                    <TableHead >NAMA TOKEN</TableHead>
                    <TableHead>DATE</TableHead>
                    <TableHead >TRANSACTION HASH</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                    <TableCell className="font-medium">0xB53...8CfA</TableCell>
                    <TableCell>Buy</TableCell>
                    <TableCell>0.000100</TableCell>
                    <TableCell>150.2312</TableCell>
                    <TableCell>11 hours ago</TableCell>
                    <TableCell>0x1234...7890</TableCell>
                </TableRow>
            </TableBody>
        </Table>

    )
}
