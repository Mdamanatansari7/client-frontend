import ParticipantsList from "./participants/ParticipantsList"



export default function ParticipantsPage() {
  return (
    <main className="flex flex-col min-h-screen bg-background">
      <section className="flex-1 pt-16">
        <div className="max-w-full mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">Registered Participants</h1>
            <p className="text-lg text-foreground text-opacity-70">
              Browse and filter registered students by branch, year, and game.
            </p>
          </div>
          <ParticipantsList />
        </div>
      </section>
    </main>
  )
}