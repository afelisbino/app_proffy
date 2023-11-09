"use client"

import { useState } from "react"
import { Calendar } from "../ui/calendar"
import { ptBR } from "date-fns/locale"

export default function Calendario() {

    const [dataSelecionada, selecionaData] = useState<Date | undefined>(new Date())

    return (
        <Calendar
            mode="single"
            selected={dataSelecionada ?? new Date()}
            onSelect={selecionaData}
            className="rounded-md border"
            locale={ptBR}
            showOutsideDays
        />
    )

}