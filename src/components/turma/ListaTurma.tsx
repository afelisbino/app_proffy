"use client"

import * as React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const turmas = [
    {
        valueTurma: "turmaA",
        labelTurma: "Turma A",
    },
    {
        valueTurma: "turmaB",
        labelTurma: "Turma B",
    },
    {
        valueTurma: "turmaC",
        labelTurma: "Turma C",
    },
    {
        valueTurma: "turmaD",
        labelTurma: "Turma D",
    },
    {
        valueTurma: "turmaE",
        labelTurma: "Turma E",
    },
]

export function ListaTurma() {
    return (
        <Select>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Suas Turmas" />
            </SelectTrigger>
            <SelectContent>
                {
                    turmas.map((turma) => {
                        return (
                            <SelectItem value={turma.valueTurma}>{turma.labelTurma}</SelectItem>
                        )
                    })
                }
            </SelectContent>
        </Select>
    )
}
