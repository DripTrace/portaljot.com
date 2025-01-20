type Office =
    | "Redlands"
    | "Loma Linda"
    | "Colton"
    | "Apple Valley"
    | "Riverside & Jurupa Valley"
    | "Indio & Blythe";

type Phone =
    | 9094702640
    | 9097926262
    | 7609464664
    | 9093704700
    | 9093704701
    | 9093704703
    | 4423727200
    | 4423727500
    | 4423727600
    | 9098804200
    | 7609227322
    | 7609724699
    | 9097926886
    | 9093704702
    | 9518883444
    | 8888996669
    | 8885050620; // for some reason goes to a landline in Virginia, jk only when appending +1

type Device = "panasonic" | "att" | "apple" | "google" | "polycom" | "yealink";

type Color = "black" | "white" | "silver";

type Kind = "landline" | "voip" | "cell";

type Pair = true | false;

type Multiple = true | false;

type Type = "entrance" | "finance" | "bill" | "schedule" | "support" | null;

type Assignee =
    | "Elaine"
    | "Karen"
    | "Kalee"
    | "Sharon"
    | "Marissa"
    | "Baybie"
    | "Alexis"
    | "Regina"
    | "Selena"
    | "Monique"
    | "Arlene"
    | null;

type Place =
    | "front desk"
    | "initial room"
    | "back room"
    | "far side"
    | "hallway";

type Printer = "brother" | "kyocera" | "hp" | null;

type Connected = true | false;

type Pin = 8804200 | 9098804200;

const PREFIX = "LLPMG";

type Designation = "LL" | "RJ" | "C" | "R" | "AV" | "IB";

type Identity =
    | "LLPMG-R-lA0a"
    | "LLPMG-R-lA0b"
    | "LLPMG-R-lA1a"
    | "LLPMG-R-lA1b"
    | "LLPMG-R-lB0a"
    | "LLPMG-R-lB0b"
    | "LLPMG-R-vA0a"
    | "LLPMG-R-vB0a"
    | "LLPMG-R-vC0a"
    | "LLPMG-R-vD0a"
    | "LLPMG-R-cA0a"
    | "LLPMG-C-lA0a"
    | "LLPMG-C-cA0a"
    | "LLPMG-AV-cA0a"
    | "LLPMG-RJ-cA0a"
    | "LLPMG-IB-lA0a"
    | "LLPMG-IB-cA0a";

type ID =
    | 0
    | 1
    | 2
    | 3
    | 4
    | 5
    | 6
    | 7
    | 8
    | 9
    | 10
    | 11
    | 12
    | 13
    | 14
    | 15
    | 16;

type Extension = number;

interface LLPMGPhone {
    id: ID;
    office: Office;
    number: Phone;
    device: Device;
    kind: Kind;
    color: Color;
    pair: Pair;
    multiple: Multiple;
    type: Type;
    assignee: Assignee;
    place: Place;
    printer: Printer;
    connected: Connected;
    identity: Identity;
}

const llpmgPhones: LLPMGPhone[] = [
    {
        id: 0,
        office: "Redlands",
        number: 9094702640,
        device: "panasonic",
        kind: "landline",
        color: "white",
        pair: true,
        multiple: true,
        type: null,
        assignee: null,
        place: "far side",
        printer: "kyocera",
        connected: true,
        identity: "LLPMG-R-lA0a",
    },
    {
        id: 1,
        office: "Redlands",
        number: 9094702640,
        device: "panasonic",
        kind: "landline",
        color: "white",
        pair: true,
        multiple: true,
        type: "entrance",
        assignee: "Kalee",
        place: "front desk",
        printer: "kyocera",
        connected: true,
        identity: "LLPMG-R-lA0b",
    },
    {
        id: 2,
        office: "Redlands",
        number: 9094702640,
        device: "att",
        kind: "landline",
        color: "silver",
        pair: true,
        multiple: true,
        type: null,
        assignee: null,
        place: "hallway",
        printer: "kyocera",
        connected: true,
        identity: "LLPMG-R-lA1a",
    },
    {
        id: 3,
        office: "Redlands",
        number: 9094702640,
        device: "att",
        kind: "landline",
        color: "silver",
        pair: true,
        multiple: true,
        type: "schedule",
        assignee: "Karen",
        place: "back room",
        printer: "kyocera",
        connected: true,
        identity: "LLPMG-R-lA1b",
    },
    {
        id: 4,
        office: "Redlands",
        number: 9097926886,
        device: "panasonic",
        kind: "landline",
        color: "black",
        pair: true,
        multiple: false,
        type: "finance",
        assignee: "Marissa",
        place: "far side",
        printer: "brother",
        connected: false,
        identity: "LLPMG-R-lB0a",
    },
    {
        id: 5,
        office: "Redlands",
        number: 9097926886,
        device: "panasonic",
        kind: "landline",
        color: "black",
        pair: true,
        multiple: false,
        type: "entrance",
        assignee: "Kalee",
        place: "front desk",
        printer: "brother",
        connected: false,
        identity: "LLPMG-R-lB0b",
    },
    {
        id: 6,
        office: "Redlands",
        number: 9098804200,
        device: "yealink",
        kind: "voip",
        color: "silver",
        pair: false,
        multiple: false,
        type: "bill",
        assignee: "Baybie",
        place: "initial room",
        printer: null,
        connected: false,
        identity: "LLPMG-R-vA0a",
    },
    {
        id: 7,
        office: "Redlands",
        number: 4423727200,
        device: "yealink",
        kind: "voip",
        color: "silver",
        pair: false,
        multiple: false,
        type: "finance",
        assignee: "Sharon",
        place: "far side",
        printer: null,
        connected: false,
        identity: "LLPMG-R-vB0a",
    },
    {
        id: 8,
        office: "Redlands",
        number: 4423727500,
        device: "yealink",
        kind: "voip",
        color: "silver",
        pair: false,
        multiple: false,
        type: "support",
        assignee: "Kalee",
        place: "front desk",
        printer: null,
        connected: false,
        identity: "LLPMG-R-vC0a",
    },
    {
        id: 9,
        office: "Redlands",
        number: 4423727600,
        device: "polycom",
        kind: "voip",
        color: "black",
        pair: false,
        multiple: false,
        type: "finance",
        assignee: "Marissa",
        place: "far side",
        printer: null,
        connected: false,
        identity: "LLPMG-R-vD0a",
    },
    {
        id: 10,
        office: "Redlands",
        number: 9093704702,
        device: "apple",
        kind: "cell",
        color: "black",
        pair: false,
        multiple: false,
        type: "support",
        assignee: "Kalee",
        place: "front desk",
        printer: null,
        connected: false,
        identity: "LLPMG-R-cA0a",
    },
    {
        id: 11,
        office: "Colton",
        number: 9093704700,
        device: "panasonic",
        kind: "landline",
        color: "black",
        pair: false,
        multiple: false,
        type: "schedule",
        assignee: "Alexis",
        place: "front desk",
        printer: "kyocera",
        connected: false,
        identity: "LLPMG-C-lA0a",
    },
    {
        id: 12,
        office: "Colton",
        number: 9093704701,
        device: "google",
        kind: "cell",
        color: "black",
        pair: false,
        multiple: false,
        type: "support",
        assignee: "Arlene",
        place: "far side",
        printer: null,
        connected: false,
        identity: "LLPMG-C-cA0a",
    },
    {
        id: 13,
        office: "Apple Valley",
        number: 7609464664,
        device: "apple",
        kind: "cell",
        color: "black",
        pair: false,
        multiple: false,
        type: "schedule",
        assignee: "Regina",
        place: "front desk",
        printer: "hp",
        connected: false,
        identity: "LLPMG-AV-cA0a",
    },
    {
        id: 14,
        office: "Riverside & Jurupa Valley",
        number: 9093704703,
        device: "apple",
        kind: "cell",
        color: "black",
        pair: false,
        multiple: false,
        type: "schedule",
        assignee: "Selena",
        place: "front desk",
        printer: null,
        connected: false,
        identity: "LLPMG-RJ-cA0a",
    },
    {
        id: 15,
        office: "Indio & Blythe",
        number: 7609724699,
        device: "panasonic",
        kind: "landline",
        color: "silver",
        pair: false,
        multiple: false,
        type: "schedule",
        assignee: "Monique",
        place: "front desk",
        printer: "hp",
        connected: false,
        identity: "LLPMG-IB-lA0a",
    },
    {
        id: 16,
        office: "Indio & Blythe",
        number: 7609227322,
        device: "apple",
        kind: "cell",
        color: "white",
        pair: false,
        multiple: false,
        type: "support",
        assignee: "Monique",
        place: "front desk",
        printer: null,
        connected: false,
        identity: "LLPMG-IB-cA0a",
    },
];
