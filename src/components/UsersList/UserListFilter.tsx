import { ChangeEvent, Dispatch, SetStateAction, useState } from "react"
import TagSelector from "../Commons/TagSelector"

type FilterTags = {
  prop: string,
  label: string
}

type UserFilter = {
  search: string
  props: string[]
}

type UserListFilterProps = {
  filter: UserFilter,
  setFilter: Dispatch<SetStateAction<UserFilter>>
}

export default function UserListFilter (props : UserListFilterProps) {
  const { filter, setFilter } = props
  const [filterTagsSelected, setFilterTagsSelected] = useState<FilterTags[]>([])
  const filterTags: FilterTags[] = [
    {prop: 'name', label: 'Nombre'}, 
    {prop: 'email', label: 'Email'}, 
    {label: 'Teléfono', prop: 'phone'}
  ]

  const onChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as string

    setFilter({
      search: value,
      props: filterTagsSelected.map((tag: FilterTags) => tag.prop)
    })
  }

  return (
    <div className="flex gap-8 justify-center w-fit h-max">
      <div className="flex gap-2 items-center justify-center">
        <p className="text-xs" >Parametros de búsqueda</p>
        <TagSelector 
          tagsList={filterTags} 
          tagsSelected={filterTagsSelected}
          setTagsSelected={setFilterTagsSelected}
        />
      </div>


      <div className="block">
        <p className="text-xs">Cadena a buscar</p>
        <input
          type="text"
          placeholder="Escribe para buscar..."
          className="text-xs border border-gray-400 px-1 py-1 rounded-md"
          onChange={(e) => onChangeInput(e)}
          value={filter?.search || ''}
        />
      </div>
    </div>
  )
}