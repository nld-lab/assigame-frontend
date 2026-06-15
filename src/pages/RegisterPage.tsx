import { RegisterForm } from "@/components/registerform";
import { DotPattern } from "@/components/ui/dot-pattern";


export default function RegisterPage() {
  return (
    <div className="h-screen w-full flex items-center justify-center">
      <div className="grid  h-full w-full lg:grid-cols-2">
        <div className="md:m-auto pt-20 h-screen flex w-full max-w-xl items-center justify-center ">
          <DotPattern width={40} height={40} className="-z-10 " glow={true} />
          <RegisterForm />
        </div>
        <div>
          <div className=" h-full w-full bg-muted rounded-lg hidden lg:block"></div>
          {/* <div className="h-full w-full bg-muted rounded-lg" style={{ backgroundImage: 'url(https://plus.unsplash.com/premium_photo-1683746792239-6ce8cdd3ac78?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8ZWNvbW1lcmNlfGVufDB8fDB8fHww)', backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }} /> */}
        </div>
      </div>
    </div>
  );
}
