import Button from '@/components/commons/Button';
import AppointmentContent from '@/components/home/AppointmentContent';

export default function Home() {
  return (
    <main className="border-1 w-full h-full bg-gray-50 text-black p-8">
      <section className="flex justify-between">
        <div className="">
          <h3 className="text-3xl font-semibold leading-9">Agenda</h3>
          <p className="text-gray-600 font-normal	leading-6">
            Manage your team members and their account permissions here.
          </p>
        </div>
        <div>
          <Button
            onClick={() => console.log('hola')}
            label="dia"
            color="secondary"
            className="btn-secondary btn-sm"
          />
          <Button
            onClick={() => console.log('hola')}
            label="Semana"
            color="ghost"
            className="btn-outline btn-sm btn-primary ml-3"
          />
          <Button
            onClick={() => console.log('hola')}
            label="Nueva cita"
            className="btn-primary btn-sm ml-3"
          />
        </div>
      </section>
      <div className="divider my-7" />
      <AppointmentContent />
    </main>
  );
}
