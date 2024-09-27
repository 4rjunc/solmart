import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { STYLED_BUTTON } from "@/constant/style"
import { Wallet } from "lucide-react"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full ">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-bold text-center text-gray-800">Welcome Back</CardTitle>
          <p className="text-center text-gray-600">We're glad to see you again!</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-gray-500">
            Connect your wallet to access your store and continue managing your business.
          </p>
          <Button className={`w-full ${STYLED_BUTTON}`} type="button">
            <Wallet className="mr-2 h-5 w-5" />
            Connect Wallet
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}