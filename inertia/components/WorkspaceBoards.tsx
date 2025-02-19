import { Card, CardHeader, CardTitle } from '#shadcn/card'
import type WorkspaceDto from '#dtos/workspace'

interface WorkspaceBoardsProps {
  boards: WorkspaceDto['boards']
}

export default function WorkspaceBoards({ boards }: WorkspaceBoardsProps) {
  return (
    <div className="w-full">
      <h3 className="text-xl font-semibold mb-6">Tableaux</h3>
      <div className="space-y-4">
        {boards && boards.length > 0 ? (
          boards.map((board) => (
            <Card
              key={board.id}
              className="bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg shadow-lg text-white"
            >
              <CardHeader className="p-4">
                <CardTitle className="text-lg font-semibold">{board.title}</CardTitle>
              </CardHeader>
            </Card>
          ))
        ) : (
          <p>Cet espace de travail ne possède pas de tableaux pour le moment.</p>
        )}
      </div>
    </div>
  )
}
