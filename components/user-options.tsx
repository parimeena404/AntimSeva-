"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface UserOptionsProps {
  onOptionsChange: (options: UserOptions) => void
}

interface UserOptions {
  gender: "male" | "female" | ""
  caste: "brahmin" | "non-brahmin" | "others" | ""
  isSeniorCitizen: boolean
}

export default function UserOptions({ onOptionsChange }: UserOptionsProps) {
  const [options, setOptions] = useState<UserOptions>({
    gender: "",
    caste: "",
    isSeniorCitizen: false,
  })

  const updateOptions = (newOptions: Partial<UserOptions>) => {
    const updated = { ...options, ...newOptions }
    setOptions(updated)
    onOptionsChange(updated)
  }

  return (
    <section className="py-8 bg-gradient-to-r from-amber-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-4">
        {/* Senior Citizen Banner */}
        {options.isSeniorCitizen && (
          <div className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg p-4 animate-pulse">
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">🙏 वैकुंठी सेवा उपलब्ध है</h3>
              <p className="text-sm">वृद्धजनों के लिए विशेष सम्मान के साथ संपूर्ण व्यवस्था</p>
            </div>
          </div>
        )}

        <Card className="shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-amber-900">Ritual Details / अनुष्ठान विवरण</CardTitle>
            <p className="text-gray-600">कृपया आवश्यक जानकारी प्रदान करें</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Gender Selection */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Gender of Deceased / मृतक का लिंग</h4>
              <div className="flex gap-4">
                <Button
                  onClick={() => updateOptions({ gender: "male" })}
                  variant={options.gender === "male" ? "default" : "outline"}
                  className={`flex-1 ${
                    options.gender === "male"
                      ? "bg-amber-900 hover:bg-amber-800"
                      : "border-amber-900 text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  Male / पुरुष
                </Button>
                <Button
                  onClick={() => updateOptions({ gender: "female" })}
                  variant={options.gender === "female" ? "default" : "outline"}
                  className={`flex-1 ${
                    options.gender === "female"
                      ? "bg-amber-900 hover:bg-amber-800"
                      : "border-amber-900 text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  Female / महिला
                </Button>
              </div>
            </div>

            {/* Caste Selection */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Caste / जाति</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button
                  onClick={() => updateOptions({ caste: "brahmin" })}
                  variant={options.caste === "brahmin" ? "default" : "outline"}
                  className={`${
                    options.caste === "brahmin"
                      ? "bg-amber-900 hover:bg-amber-800"
                      : "border-amber-900 text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  Brahmin / ब्राह्मण
                </Button>
                <Button
                  onClick={() => updateOptions({ caste: "non-brahmin" })}
                  variant={options.caste === "non-brahmin" ? "default" : "outline"}
                  className={`${
                    options.caste === "non-brahmin"
                      ? "bg-amber-900 hover:bg-amber-800"
                      : "border-amber-900 text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  Non-Brahmin / अन्य
                </Button>
                <Button
                  onClick={() => updateOptions({ caste: "others" })}
                  variant={options.caste === "others" ? "default" : "outline"}
                  className={`${
                    options.caste === "others"
                      ? "bg-amber-900 hover:bg-amber-800"
                      : "border-amber-900 text-amber-900 hover:bg-amber-50"
                  }`}
                >
                  Others / अन्य
                </Button>
              </div>
            </div>

            {/* Senior Citizen Option */}
            <div>
              <h4 className="text-lg font-semibold text-gray-900 mb-3">Age Category / आयु श्रेणी</h4>
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => updateOptions({ isSeniorCitizen: !options.isSeniorCitizen })}
                  variant={options.isSeniorCitizen ? "default" : "outline"}
                  className={`${
                    options.isSeniorCitizen
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-600 text-purple-600 hover:bg-purple-50"
                  }`}
                >
                  {options.isSeniorCitizen ? "✓ " : ""}Senior Citizen / वृद्धजन (60+ years)
                </Button>
                {options.isSeniorCitizen && <Badge className="bg-purple-100 text-purple-800">वैकुंठी सेवा योग्य</Badge>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
