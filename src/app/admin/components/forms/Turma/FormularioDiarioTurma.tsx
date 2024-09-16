'use client'

import { Loader2, Save } from 'lucide-react'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { DialogFooter } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export function FormularioDiarioClasse() {
  const [formDiario, setFormDiario] = useState({
    studentName: '',
    periodType: '',
    periodNumber: '',
    grade: '',
    subject: '',
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormDiario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormDiario((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to a server or perform some action
    console.log('Form submitted:', formDiario)
    // Reset form after submission
    setFormDiario({
      studentName: '',
      periodType: '',
      periodNumber: '',
      grade: '',
      subject: '',
    })
  }

  // const isFormValid = Object.values(formDiario).every((value) => value !== '')
  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        <div>
          <Label htmlFor="studentName">Aluno</Label>
          <Input
            id="studentName"
            name="studentName"
            value={formDiario.studentName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="periodType">Tipo Periodo</Label>
          <Select
            value={formDiario.periodType}
            onValueChange={(value) => handleSelectChange('periodType', value)}
          >
            <SelectTrigger id="periodType">
              <SelectValue placeholder="Selecione o tipo de periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="mensal">Mensal</SelectItem>
              <SelectItem value="bimestral">Bimestral</SelectItem>
              <SelectItem value="trimestral">Trimestral</SelectItem>
              <SelectItem value="semestral">Semestral</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="periodNumber">Periodo</Label>
          <Input
            id="periodNumber"
            name="periodNumber"
            type="number"
            min="1"
            value={formDiario.periodNumber}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
        <div>
          <Label htmlFor="subject">Disciplina</Label>
          <Select
            value={formDiario.subject}
            onValueChange={(value) => handleSelectChange('subject', value)}
          >
            <SelectTrigger id="subject">
              <SelectValue placeholder="Selecione a disciplina" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="matematica">Matemática</SelectItem>
              <SelectItem value="ciencia">Ciencia</SelectItem>
              <SelectItem value="portugues">Portugues</SelectItem>
              <SelectItem value="historia">Historia</SelectItem>
              <SelectItem value="artes">Artes</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="grade">Nota</Label>
          <Input
            id="grade"
            name="grade"
            type="number"
            min="0"
            max="10"
            step="0.1"
            value={formDiario.grade}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>
      <DialogFooter>
        <div className="flex items-center">
          {!formDiario ? (
            <Button
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
              disabled
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Salvando...
            </Button>
          ) : (
            <Button
              type="submit"
              className="bg-app-green-500 hover:bg-app-green-600 gap-2 shadow"
            >
              <Save className="size-5" />
              Salvar
            </Button>
          )}
        </div>
      </DialogFooter>
    </form>
  )
}
