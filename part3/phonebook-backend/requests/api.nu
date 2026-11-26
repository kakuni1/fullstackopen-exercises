const BASE_URL = "http://localhost:3001/api/persons"

export def "get-by-id" [id: string] {
  http get -f -e $"($BASE_URL)/($id)"
}

export def "invalid-id" [] {
  http get -f -e $"($BASE_URL)/invalid-id"
}

export def "list" [] {
  http get $BASE_URL
}

export def "create" [name: string, number: string] {
  http post -t application/json -f -e $BASE_URL {
    name: $name
    number: $number
  }
}

export def "delete" [id: string] {
  http delete -f -e $"($BASE_URL)/($id)"
}

export def "create-delete" [name: string, number: string] {
  let response = (create $name $number)
  let id = ($response | get body.id)
  delete $id
}

export def "update" [id: string, name:string, number:string] {
  http put -t application/json -f -e $"($BASE_URL)/($id)" {
    name: $name
    number: $number
  }
}
