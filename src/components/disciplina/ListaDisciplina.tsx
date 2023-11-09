"use client"

import * as React from "react"

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"

const disciplinas = [
    {
        value: "disciplinaA",
        labelDisciplina: "disciplina A",
    },
    {
        value: "disciplinaB",
        labelDisciplina: "disciplina B",
    },
    {
        value: "disciplinaC",
        labelDisciplina: "disciplina C",
    },
    {
        value: "disciplinaD",
        labelDisciplina: "disciplina D",
    },
    {
        value: "disciplinaE",
        labelDisciplina: "disciplina E",
    },
]

export function ListaDisciplina() {

    return (
        <Select>
            <SelectTrigger className="w-auto">
                <SelectValue placeholder="Suas Disciplinas" />
            </SelectTrigger>
            <SelectContent>
                {
                    disciplinas.map((disciplina) => {
                        return (
                            <SelectItem value={disciplina.value}>{disciplina.labelDisciplina}</SelectItem>
                        )
                    })
                }
            </SelectContent>
        </Select>
    )
}
