// Mock data for the MMDA website prototype

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  titleFil: string;
  excerpt: string;
  excerptFil: string;
  body: string[];
  bodyFil: string[];
  category: "advisory" | "press" | "notice";
  date: string;
  imageUrl?: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleFil: string;
  description: string;
  descriptionFil: string;
  href: string;
  icon: string;
}

export interface TrafficRoute {
  id: string;
  name: string;
  status: "light" | "moderate" | "heavy";
  speed: number; // km/h
  updatedAt: string;
}

export const mockNews: NewsArticle[] = [
  {
    id: "1",
    slug: "mmda-implements-new-traffic-scheme-edsa",
    title: "MMDA Implements New Traffic Scheme Along EDSA Southbound",
    titleFil: "MMDA Nagpatupad ng Bagong Traffic Scheme sa EDSA Southbound",
    excerpt:
      "The Metropolitan Manila Development Authority announces a new traffic management plan along EDSA Southbound corridor to ease congestion during peak hours.",
    excerptFil:
      "Inanunsyo ng Metropolitan Manila Development Authority ang bagong traffic management plan sa EDSA Southbound corridor upang mabawasan ang trapiko sa peak hours.",
    body: [
      "The Metropolitan Manila Development Authority (MMDA) has officially implemented a new traffic management scheme along the EDSA Southbound corridor, effective immediately. The scheme introduces dedicated lane assignments and revised signal timing at key intersections from Quezon Avenue to Magallanes, targeting a 20% reduction in travel time during the morning and evening rush hours.",
      "Under the new plan, the innermost lane of EDSA Southbound will be designated exclusively for public utility buses during peak hours from 7:00 AM to 9:00 AM and 5:00 PM to 8:00 PM. Private vehicles will be required to use the outer two lanes, while motorcycles must stay in the outermost lane. MMDA traffic enforcers will be deployed at all major intersections to ensure compliance.",
      "The MMDA urges motorists to plan their routes accordingly and allow extra travel time during the adjustment period. Real-time traffic updates will be available through the MMDA traffic app and official social media channels. The agency will evaluate the effectiveness of the scheme after a 30-day trial period and make adjustments as necessary based on traffic flow data.",
    ],
    bodyFil: [
      "Opisyal nang ipinatupad ng Metropolitan Manila Development Authority (MMDA) ang bagong traffic management scheme sa EDSA Southbound corridor, na agad na epektibo. Ipinakilala ng scheme ang mga dedicated lane assignment at binagong signal timing sa mga pangunahing interseksyon mula Quezon Avenue hanggang Magallanes, na naglalayong bawasan ng 20% ang oras ng biyahe sa umaga at gabi na rush hours.",
      "Sa ilalim ng bagong plano, ang pinakaloob na lane ng EDSA Southbound ay eksklusibong italaga para sa mga public utility bus sa peak hours mula 7:00 AM hanggang 9:00 AM at 5:00 PM hanggang 8:00 PM. Ang mga pribadong sasakyan ay kailangang gumamit ng dalawang panlabas na lane, habang ang mga motorsiklo ay dapat manatili sa pinakalabas na lane. Mga traffic enforcer ng MMDA ang ide-deploy sa lahat ng pangunahing interseksyon upang matiyak ang pagsunod.",
      "Hinihikayat ng MMDA ang mga motorista na planuhin ang kanilang ruta nang naaayon at magbigay ng dagdag na oras ng biyahe sa panahon ng adjustment period. Ang real-time na traffic updates ay makukuha sa pamamagitan ng MMDA traffic app at opisyal na social media channels. Susuriin ng ahensya ang bisa ng scheme pagkatapos ng 30-araw na trial period at gagawa ng mga pagbabago batay sa traffic flow data.",
    ],
    category: "advisory",
    date: "2026-04-25",
    imageUrl: "/images/1.jpg",
  },
  {
    id: "2",
    slug: "flood-control-pumping-stations-operational",
    title: "All Flood Control Pumping Stations Now Fully Operational",
    titleFil: "Lahat ng Flood Control Pumping Stations Ganap nang Operational",
    excerpt:
      "In preparation for the rainy season, MMDA confirms that all 72 pumping stations across Metro Manila are fully operational and ready for deployment.",
    excerptFil:
      "Bilang paghahanda sa tag-ulan, kinumpirma ng MMDA na ang lahat ng 72 pumping stations sa Metro Manila ay ganap nang operational.",
    body: [
      "The MMDA Flood Control and Sewerage Management Office has confirmed that all 72 pumping stations across Metro Manila are now fully operational ahead of the 2026 rainy season. Each station has undergone comprehensive maintenance, including pump motor overhaul, electrical system testing, and drainage channel dredging to ensure maximum efficiency during heavy rainfall events.",
      "MMDA Chairman Romando Artes personally inspected several key pumping stations in flood-prone areas including Alabang, Marikina, and Tondo. He noted that the agency has also pre-positioned rescue boats, water rescue teams, and emergency supplies at strategic locations throughout the metro. An additional 15 portable pumps have been acquired to supplement capacity in areas prone to flash flooding.",
      "Residents in low-lying areas are encouraged to remain vigilant and monitor official MMDA advisories during heavy rainfall. The agency operates a 24/7 flood monitoring center that tracks water levels across all major waterways and drainage systems in Metro Manila. Citizens can report flooding incidents through the MMDA hotline 136 or via the official MMDA social media accounts.",
    ],
    bodyFil: [
      "Kinumpirma ng MMDA Flood Control and Sewerage Management Office na ang lahat ng 72 pumping stations sa Metro Manila ay ganap nang operational bago mag-tag-ulan ng 2026. Ang bawat istasyon ay sumailalim sa komprehensibong maintenance, kabilang ang pump motor overhaul, electrical system testing, at drainage channel dredging upang matiyak ang pinakamataas na kahusayan sa panahon ng malakas na pag-ulan.",
      "Personal na ininspeksyon ni MMDA Chairman Romando Artes ang ilang pangunahing pumping stations sa mga lugar na madaling bumaha kabilang ang Alabang, Marikina, at Tondo. Sinabi niya na nag-pre-position na rin ang ahensya ng mga rescue boat, water rescue team, at emergency supplies sa mga estratehikong lokasyon sa buong metro. Dagdag na 15 portable pumps ang nakuha upang dagdagan ang kapasidad sa mga lugar na madaling bahain.",
      "Hinihikayat ang mga residente sa mababang lugar na manatiling mapagmatyag at subaybayan ang mga opisyal na advisory ng MMDA sa panahon ng malakas na pag-ulan. Nagpapatakbo ang ahensya ng 24/7 flood monitoring center na nagmamanman ng water levels sa lahat ng pangunahing waterway at drainage system sa Metro Manila. Maaaring mag-ulat ang mga mamamayan ng mga insidente ng pagbaha sa pamamagitan ng MMDA hotline 136 o sa opisyal na social media accounts ng MMDA.",
    ],
    category: "press",
    date: "2026-04-23",
    imageUrl: "/images/2.jpg",
  },
  {
    id: "3",
    slug: "number-coding-scheme-update-may-2026",
    title: "Updated Number Coding Scheme Effective May 2026",
    titleFil: "Na-update na Number Coding Scheme Epektibo sa Mayo 2026",
    excerpt:
      "MMDA releases updated number coding guidelines effective May 1, 2026. Window hours and exemptions have been revised to accommodate new public transport routes.",
    excerptFil:
      "Inilabas ng MMDA ang na-update na number coding guidelines na epektibo simula Mayo 1, 2026. Binago ang window hours at exemptions.",
    body: [
      "The MMDA has released the updated Unified Vehicular Volume Reduction Program (UVVRP), commonly known as the number coding scheme, effective May 1, 2026. The revised guidelines adjust the window hours to 7:00 AM–10:00 AM and 4:00 PM–8:00 PM on weekdays, reflecting changes in commuter patterns and the expansion of public transport services across Metro Manila.",
      "Key changes include the exemption of hybrid and fully electric vehicles from the coding scheme, as well as vehicles registered under the Public Utility Vehicle Modernization Program. Motorcycles remain exempt, and the existing exemptions for medical emergencies, government vehicles on official business, and diplomats continue to apply. Violations will result in a fine of PHP 300 for the first offense and PHP 500 for subsequent offenses within the same calendar year.",
      "The MMDA clarifies that the number coding scheme remains suspended on holidays and during periods declared by the national government. Motorists are advised to verify their plate number coding day through the MMDA website or mobile application. The agency will conduct an information campaign in the weeks leading up to the effectivity date to ensure widespread public awareness of the changes.",
    ],
    bodyFil: [
      "Inilabas ng MMDA ang na-update na Unified Vehicular Volume Reduction Program (UVVRP), kilala bilang number coding scheme, na epektibo simula Mayo 1, 2026. Ang binagong guidelines ay nag-aayos ng window hours sa 7:00 AM–10:00 AM at 4:00 PM–8:00 PM sa mga weekday, na sumasalamin sa mga pagbabago sa pattern ng mga commuter at pagpapalawak ng mga serbisyo ng pampublikong transportasyon sa Metro Manila.",
      "Kabilang sa mga pangunahing pagbabago ang exemption ng mga hybrid at fully electric na sasakyan mula sa coding scheme, pati na rin ang mga sasakyang nakarehistro sa ilalim ng Public Utility Vehicle Modernization Program. Ang mga motorsiklo ay nananatiling exempt, at ang mga umiiral na exemptions para sa medical emergencies, government vehicles na nasa opisyal na gawain, at mga diplomat ay patuloy na naaangkop. Ang mga paglabag ay magkakaroon ng multang PHP 300 sa unang pagkakataon at PHP 500 sa mga susunod na paglabag sa loob ng parehong taon.",
      "Nilinaw ng MMDA na ang number coding scheme ay nananatiling suspendido sa mga holiday at sa mga panahong idineklara ng pambansang pamahalaan. Pinapayuhan ang mga motorista na i-verify ang kanilang plate number coding day sa pamamagitan ng MMDA website o mobile application. Magsasagawa ang ahensya ng information campaign sa mga linggong bago ang effectivity date upang matiyak ang malawakang kaalaman ng publiko sa mga pagbabago.",
    ],
    category: "notice",
    date: "2026-04-20",
    imageUrl: "/images/3.jpg",
  },
  {
    id: "4",
    slug: "mmda-clears-estero-de-san-miguel",
    title: "MMDA Completes Clearing of Estero de San Miguel in Manila",
    titleFil: "Natapos ng MMDA ang Paglilinis ng Estero de San Miguel sa Maynila",
    excerpt:
      "A major waterway rehabilitation project has been completed, removing over 15,000 cubic meters of solid waste and restoring water flow to Estero de San Miguel.",
    excerptFil:
      "Nakumpleto ang isang malaking proyekto sa rehabilitasyon ng daluyan ng tubig, na nag-alis ng mahigit 15,000 cubic meters ng basura at naibalik ang daloy ng tubig sa Estero de San Miguel.",
    body: [
      "The MMDA has successfully completed the clearing and rehabilitation of Estero de San Miguel in Manila, one of the most heavily polluted waterways in the capital. Over the course of three months, the operation removed approximately 15,000 cubic meters of solid waste, silt, and debris that had accumulated over decades, significantly improving water flow and reducing flood risk in the surrounding barangays.",
      "The project involved coordination between the MMDA, the City Government of Manila, the Department of Environment and Natural Resources (DENR), and local barangay officials. Heavy equipment including backhoes, dump trucks, and barge-mounted excavators were deployed along the 2.8-kilometer stretch of the estero. Informal settlers along the waterway were relocated to government housing units in coordination with the National Housing Authority.",
      "MMDA Chairman Romando Artes emphasized that the clearing of Estero de San Miguel is part of the agency's broader waterway rehabilitation program covering 47 priority esteros across Metro Manila. The agency will now conduct regular maintenance to prevent the re-accumulation of waste and will install trash traps at key entry points. Community-based monitoring programs are also being established to sustain the improvements achieved.",
    ],
    bodyFil: [
      "Matagumpay na nakumpleto ng MMDA ang paglilinis at rehabilitasyon ng Estero de San Miguel sa Maynila, isa sa mga pinaka-maruming daluyan ng tubig sa kabisera. Sa loob ng tatlong buwan, ang operasyon ay nag-alis ng humigit-kumulang 15,000 cubic meters ng solidong basura, banlik, at debris na naipon sa loob ng mga dekada, na lubhang nagpabuti ng daloy ng tubig at nagbawas ng panganib ng pagbaha sa mga nakapaligid na barangay.",
      "Ang proyekto ay kinasangkutan ng koordinasyon sa pagitan ng MMDA, Pamahalaang Lungsod ng Maynila, Department of Environment and Natural Resources (DENR), at mga lokal na opisyal ng barangay. Mabibigat na kagamitan kabilang ang mga backhoe, dump truck, at barge-mounted excavator ang na-deploy sa 2.8-kilometrong haba ng estero. Ang mga informal settler sa tabi ng daluyan ng tubig ay inilipat sa mga government housing unit sa koordinasyon ng National Housing Authority.",
      "Binigyang-diin ni MMDA Chairman Romando Artes na ang paglilinis ng Estero de San Miguel ay bahagi ng mas malawak na waterway rehabilitation program ng ahensya na sumasaklaw sa 47 priority esteros sa Metro Manila. Magsasagawa na ngayon ang ahensya ng regular na maintenance upang maiwasan ang muling pag-iipon ng basura at mag-i-install ng mga trash trap sa mga pangunahing entry point. Ang mga community-based monitoring program ay itinatayo rin upang mapanatili ang mga nagawang pagpapabuti.",
    ],
    category: "press",
    date: "2026-04-18",
    imageUrl: "/images/4.jpg",
  },
  {
    id: "5",
    slug: "road-reblocking-commonwealth-ave",
    title: "Road Reblocking Operations on Commonwealth Avenue This Weekend",
    titleFil: "Road Reblocking Operations sa Commonwealth Avenue Ngayong Weekend",
    excerpt:
      "Motorists are advised to take alternate routes as MMDA conducts road reblocking along Commonwealth Avenue from Tandang Sora to Batasan Road on April 19–20.",
    excerptFil:
      "Pinapayuhan ang mga motorista na gumamit ng alternatibong ruta dahil sa road reblocking ng MMDA sa Commonwealth Avenue mula Tandang Sora hanggang Batasan Road sa Abril 19–20.",
    body: [
      "The MMDA will conduct road reblocking operations along Commonwealth Avenue from the Tandang Sora intersection to Batasan Road on April 19–20, 2026. The operations will commence at 10:00 PM on Saturday and are expected to be completed by 5:00 AM on Monday. During this period, affected lanes will be closed to vehicular traffic to allow for the removal and replacement of deteriorated concrete road panels.",
      "Motorists traveling along Commonwealth Avenue during the reblocking period are advised to use alternative routes including Mindanao Avenue, Regalado Avenue, and Congressional Avenue. The MMDA will deploy traffic management teams at all entry and exit points of the work zone to ensure the orderly flow of traffic. Signage and early warning devices will be installed at least 500 meters before the affected area to alert approaching vehicles.",
      "The road reblocking is part of the MMDA's annual road maintenance program aimed at ensuring the structural integrity of major thoroughfares in Metro Manila. Commonwealth Avenue, being one of the widest and busiest roads in the metro, requires periodic maintenance to address surface damage caused by heavy vehicular traffic. The MMDA apologizes for the inconvenience and assures the public that the work will be completed within the scheduled timeframe.",
    ],
    bodyFil: [
      "Magsasagawa ang MMDA ng road reblocking operations sa Commonwealth Avenue mula sa interseksyon ng Tandang Sora hanggang Batasan Road sa Abril 19–20, 2026. Ang operasyon ay magsisimula sa 10:00 PM ng Sabado at inaasahang matatapos bago mag-5:00 AM ng Lunes. Sa panahong ito, ang mga apektadong lane ay isasara sa trapiko upang payagan ang pag-alis at pagpapalit ng mga sirang concrete road panel.",
      "Pinapayuhan ang mga motoristang bumibiyahe sa Commonwealth Avenue sa panahon ng reblocking na gumamit ng mga alternatibong ruta kabilang ang Mindanao Avenue, Regalado Avenue, at Congressional Avenue. Magde-deploy ang MMDA ng mga traffic management team sa lahat ng entry at exit point ng work zone upang matiyak ang maayos na daloy ng trapiko. Mga signage at early warning device ang mai-install nang hindi bababa sa 500 metro bago ang apektadong lugar.",
      "Ang road reblocking ay bahagi ng taunang road maintenance program ng MMDA na naglalayong matiyak ang structural integrity ng mga pangunahing kalsada sa Metro Manila. Ang Commonwealth Avenue, bilang isa sa mga pinakamalawak at pinaka-abalang kalsada sa metro, ay nangangailangan ng pana-panahong maintenance upang matugunan ang surface damage na dulot ng mabigat na trapiko. Humihingi ng paumanhin ang MMDA sa abala at tinitiyak sa publiko na matatapos ang trabaho sa loob ng nakaiskedyul na oras.",
    ],
    category: "advisory",
    date: "2026-04-17",
    imageUrl: "/images/5.jpg",
  },
  {
    id: "6",
    slug: "mmda-earthquake-drill-metro-manila",
    title: "MMDA to Lead Metro-Wide Earthquake Preparedness Drill",
    titleFil: "MMDA Mangunguna sa Metro-Wide Earthquake Preparedness Drill",
    excerpt:
      "The MMDA will conduct a simultaneous earthquake drill across all 17 local government units in Metro Manila on April 22 as part of national disaster resilience efforts.",
    excerptFil:
      "Magsasagawa ang MMDA ng sabay-sabay na earthquake drill sa lahat ng 17 local government units sa Metro Manila sa Abril 22 bilang bahagi ng pambansang disaster resilience.",
    body: [
      "The MMDA, in coordination with the National Disaster Risk Reduction and Management Council (NDRRMC), will lead a metro-wide earthquake preparedness drill on April 22, 2026. The simultaneous drill will be conducted across all 17 cities and municipalities in Metro Manila, involving government offices, schools, hospitals, shopping malls, and private establishments. The exercise aims to test the readiness of emergency response protocols and evacuation procedures.",
      "The drill will simulate a magnitude 7.2 earthquake scenario along the West Valley Fault, which runs through several densely populated areas in Metro Manila. Participants will practice the standard \"Drop, Cover, and Hold\" response, followed by building evacuation and assembly at designated safe zones. Emergency response teams including the Bureau of Fire Protection, Philippine Red Cross, and local disaster risk reduction offices will conduct search-and-rescue simulations.",
      "The MMDA encourages all residents, businesses, and institutions in Metro Manila to actively participate in the drill. Emergency alert systems including SMS notifications and public address systems will be activated at exactly 2:00 PM to signal the start of the exercise. The agency reminds the public that preparedness is the most effective way to minimize casualties and damage in the event of a major earthquake.",
    ],
    bodyFil: [
      "Ang MMDA, sa koordinasyon ng National Disaster Risk Reduction and Management Council (NDRRMC), ay mangunguna sa isang metro-wide earthquake preparedness drill sa Abril 22, 2026. Ang sabay-sabay na drill ay isasagawa sa lahat ng 17 lungsod at munisipalidad sa Metro Manila, na kinasasangkutan ng mga tanggapan ng gobyerno, paaralan, ospital, shopping mall, at mga pribadong establisyimento. Layunin ng ehersisyo na subukan ang kahandaan ng mga emergency response protocol at evacuation procedure.",
      "Ang drill ay magsisimula ng senaryo ng magnitude 7.2 na lindol sa West Valley Fault, na tumatakbo sa ilang mataong lugar sa Metro Manila. Ang mga kalahok ay magsasanay ng karaniwang \"Drop, Cover, and Hold\" na tugon, kasunod ng building evacuation at pagtitipon sa mga itinalagang safe zone. Ang mga emergency response team kabilang ang Bureau of Fire Protection, Philippine Red Cross, at mga lokal na disaster risk reduction office ay magsasagawa ng search-and-rescue simulation.",
      "Hinihikayat ng MMDA ang lahat ng residente, negosyo, at institusyon sa Metro Manila na aktibong lumahok sa drill. Ang mga emergency alert system kabilang ang SMS notification at public address system ay i-a-activate nang eksakto sa 2:00 PM upang hudyatan ang simula ng ehersisyo. Pinapaalalahanan ng ahensya ang publiko na ang pagiging handa ang pinaka-epektibong paraan upang mabawasan ang casualties at pinsala sa kaganapan ng isang malaking lindol.",
    ],
    category: "notice",
    date: "2026-04-15",
    imageUrl: "/images/1.jpg",
  },
  {
    id: "7",
    slug: "skyway-stage-3-traffic-advisory",
    title: "Traffic Advisory: Skyway Stage 3 Partial Closure for Maintenance",
    titleFil: "Traffic Advisory: Bahagyang Pagsasara ng Skyway Stage 3 para sa Maintenance",
    excerpt:
      "Skyway Stage 3 northbound will undergo partial closure from 11 PM to 5 AM on April 16–17 for routine maintenance. Motorists are advised to use alternative routes.",
    excerptFil:
      "Ang Skyway Stage 3 northbound ay bahagyang isasara mula 11 PM hanggang 5 AM sa Abril 16–17 para sa routine maintenance. Pinapayuhan ang mga motorista na gumamit ng alternatibong ruta.",
    body: [
      "The MMDA, in coordination with San Miguel Corporation (SMC), advises the motoring public that Skyway Stage 3 northbound will undergo partial closure from 11:00 PM to 5:00 AM on April 16–17, 2026. The closure will affect the section between the Buendia on-ramp and the Quezon Avenue off-ramp to allow for routine structural inspection and maintenance of expansion joints and road surface repairs.",
      "During the partial closure, only one lane will remain open for northbound traffic on the affected section. Motorists are strongly advised to use alternative routes such as EDSA, C5, or SLEX to reach their destinations. Traffic enforcers and road safety personnel will be stationed at key points along the Skyway to guide motorists and ensure smooth traffic flow through the reduced lanes.",
      "SMC and the MMDA assure the public that the maintenance work is essential to ensure the continued safety and structural integrity of the Skyway Stage 3 infrastructure. The overnight schedule was chosen to minimize disruption to daily commuters. Regular maintenance updates will be posted on the official Skyway and MMDA social media pages, and motorists are encouraged to check these channels before planning their trips.",
    ],
    bodyFil: [
      "Ang MMDA, sa koordinasyon ng San Miguel Corporation (SMC), ay nagpapayo sa mga motorista na ang Skyway Stage 3 northbound ay bahagyang isasara mula 11:00 PM hanggang 5:00 AM sa Abril 16–17, 2026. Ang pagsasara ay makakaapekto sa seksyon sa pagitan ng Buendia on-ramp at Quezon Avenue off-ramp upang payagan ang routine structural inspection at maintenance ng mga expansion joint at road surface repair.",
      "Sa panahon ng bahagyang pagsasara, isang lane lamang ang mananatiling bukas para sa northbound traffic sa apektadong seksyon. Mahigpit na pinapayuhan ang mga motorista na gumamit ng mga alternatibong ruta tulad ng EDSA, C5, o SLEX upang makarating sa kanilang destinasyon. Mga traffic enforcer at road safety personnel ang ilalagay sa mga pangunahing punto sa Skyway upang gabayan ang mga motorista at matiyak ang maayos na daloy ng trapiko sa mga natitirang lane.",
      "Tinitiyak ng SMC at MMDA sa publiko na ang maintenance work ay mahalaga upang matiyak ang patuloy na kaligtasan at structural integrity ng Skyway Stage 3 infrastructure. Ang overnight na iskedyul ay pinili upang mabawasan ang abala sa mga pang-araw-araw na commuter. Ang mga regular na maintenance update ay ipo-post sa opisyal na Skyway at MMDA social media pages, at hinihikayat ang mga motorista na suriin ang mga channel na ito bago magplano ng kanilang biyahe.",
    ],
    category: "advisory",
    date: "2026-04-14",
    imageUrl: "/images/2.jpg",
  },
  {
    id: "8",
    slug: "mmda-chairman-meets-transport-groups",
    title: "MMDA Chairman Meets with Transport Groups on Fare Modernization",
    titleFil: "MMDA Chairman Nakipagpulong sa mga Transport Groups Tungkol sa Fare Modernization",
    excerpt:
      "Chairman Romando Artes held a dialogue with major public transport groups to discuss the implementation timeline for the unified fare collection system in Metro Manila.",
    excerptFil:
      "Nakipag-diyalogo si Chairman Romando Artes sa mga pangunahing transport groups upang talakayin ang timeline ng implementasyon ng unified fare collection system sa Metro Manila.",
    body: [
      "MMDA Chairman Romando Artes convened a dialogue with representatives from major public transport organizations to discuss the implementation timeline and operational framework for the unified fare collection system in Metro Manila. The meeting, held at the MMDA headquarters in Makati, was attended by leaders from PISTON, LTFRB-accredited transport cooperatives, and operators of the EDSA Bus Carousel.",
      "During the dialogue, Chairman Artes presented the proposed phased rollout of the contactless fare payment system, which will integrate jeepneys, buses, UV Express, and the EDSA Bus Carousel under a single electronic payment platform. Transport groups raised concerns about the cost of onboard payment terminals and the transition period for drivers and operators. The MMDA committed to providing subsidized terminal units and a six-month grace period before full enforcement.",
      "Both parties agreed to establish a joint technical working group that will meet bi-weekly to address implementation challenges and ensure the smooth transition to the new fare system. The unified fare collection system is a key component of the government's public transport modernization program and is expected to improve commuter convenience, reduce fare disputes, and provide accurate ridership data for future transport planning.",
    ],
    bodyFil: [
      "Si MMDA Chairman Romando Artes ay nanguna sa isang diyalogo kasama ang mga kinatawan mula sa mga pangunahing organisasyon ng pampublikong transportasyon upang talakayin ang implementation timeline at operational framework para sa unified fare collection system sa Metro Manila. Ang pulong, na ginanap sa MMDA headquarters sa Makati, ay dinaluhan ng mga lider mula sa PISTON, LTFRB-accredited transport cooperatives, at mga operator ng EDSA Bus Carousel.",
      "Sa panahon ng diyalogo, ipinresenta ni Chairman Artes ang panukalang phased rollout ng contactless fare payment system, na mag-iintegrate ng mga jeepney, bus, UV Express, at EDSA Bus Carousel sa ilalim ng isang electronic payment platform. Naglahad ang mga transport group ng mga alalahanin tungkol sa gastos ng mga onboard payment terminal at ang transition period para sa mga driver at operator. Nangako ang MMDA na magbibigay ng subsidized terminal units at anim na buwang grace period bago ang ganap na pagpapatupad.",
      "Nagkasundo ang magkabilang panig na magtatag ng isang joint technical working group na magpupulong tuwing dalawang linggo upang tugunan ang mga hamon sa implementasyon at matiyak ang maayos na paglipat sa bagong fare system. Ang unified fare collection system ay isang pangunahing bahagi ng public transport modernization program ng gobyerno at inaasahang magpapabuti ng kaginhawaan ng mga commuter, magbabawas ng mga sigalot sa pamasahe, at magbibigay ng tumpak na ridership data para sa hinaharap na transport planning.",
    ],
    category: "press",
    date: "2026-04-12",
    imageUrl: "/images/3.jpg",
  },
  {
    id: "9",
    slug: "public-hearing-edsa-bus-carousel",
    title: "Public Hearing Set for EDSA Bus Carousel Permanent Operation",
    titleFil: "Public Hearing Itinakda para sa Permanenteng Operasyon ng EDSA Bus Carousel",
    excerpt:
      "MMDA invites the public to a hearing on April 28 regarding the proposal to make the EDSA Bus Carousel a permanent fixture of Metro Manila's transport network.",
    excerptFil:
      "Iniimbitahan ng MMDA ang publiko sa isang pagdinig sa Abril 28 tungkol sa panukala na gawin permanente ang EDSA Bus Carousel sa transport network ng Metro Manila.",
    body: [
      "The MMDA announces a public hearing scheduled for April 28, 2026, at the MMDA Main Office in Makati City to discuss the proposal to make the EDSA Bus Carousel a permanent component of Metro Manila's public transport network. The hearing is open to all stakeholders including commuters, transport operators, local government officials, urban planners, and members of civil society who wish to provide input on the proposal.",
      "The EDSA Bus Carousel was initially launched as a temporary measure during the COVID-19 pandemic to provide a dedicated bus lane along EDSA. Since its inception, the system has served over 300 million passenger trips and has demonstrated significant reductions in bus travel time along the corridor. The proposal seeks to formalize the carousel's operations, establish permanent stations, and integrate the system with other mass transit options including the MRT-3 and future subway lines.",
      "Interested parties may register to speak at the hearing through the MMDA website or may submit written position papers via email to buscarousel@mmda.gov.ph until April 25, 2026. The MMDA is committed to a transparent and inclusive decision-making process and welcomes diverse perspectives on the future of the EDSA Bus Carousel. A summary of the hearing proceedings and recommendations will be published within two weeks of the event.",
    ],
    bodyFil: [
      "Inanunsyo ng MMDA ang isang public hearing na nakatakda sa Abril 28, 2026, sa MMDA Main Office sa Makati City upang talakayin ang panukala na gawin permanente ang EDSA Bus Carousel bilang bahagi ng public transport network ng Metro Manila. Ang pagdinig ay bukas sa lahat ng stakeholder kabilang ang mga commuter, transport operator, local government official, urban planner, at mga miyembro ng civil society na nais magbigay ng input sa panukala.",
      "Ang EDSA Bus Carousel ay unang inilunsad bilang pansamantalang hakbang sa panahon ng COVID-19 pandemic upang magbigay ng dedicated bus lane sa EDSA. Mula nang ito ay magsimula, ang sistema ay nagsilbi ng mahigit 300 milyong passenger trip at nagpakita ng malaking pagbawas sa oras ng biyahe ng bus sa corridor. Ang panukala ay naglalayong i-formalize ang operasyon ng carousel, magtayo ng mga permanenteng istasyon, at i-integrate ang sistema sa iba pang mass transit option kabilang ang MRT-3 at mga hinaharap na subway line.",
      "Ang mga interesadong partido ay maaaring mag-rehistro upang magsalita sa pagdinig sa pamamagitan ng MMDA website o maaaring magsumite ng nakasulat na position paper sa pamamagitan ng email sa buscarousel@mmda.gov.ph hanggang Abril 25, 2026. Ang MMDA ay nakatuon sa isang transparent at inclusive na proseso ng paggawa ng desisyon at tinatanggap ang iba't ibang perspektiba sa hinaharap ng EDSA Bus Carousel. Isang buod ng mga proceedings at rekomendasyon ng pagdinig ang ilalathala sa loob ng dalawang linggo pagkatapos ng kaganapan.",
    ],
    category: "notice",
    date: "2026-04-10",
    imageUrl: "/images/4.jpg",
  },
  {
    id: "10",
    slug: "metro-manila-flood-warning-april",
    title: "Flood Warning Issued for Low-Lying Areas in Metro Manila",
    titleFil: "Flood Warning Inilabas para sa Mababang Lugar sa Metro Manila",
    excerpt:
      "MMDA issues a flood warning for residents in low-lying areas along the Pasig River and Marikina River as continuous rainfall is expected over the next 48 hours.",
    excerptFil:
      "Nag-isyu ang MMDA ng flood warning para sa mga residente sa mababang lugar sa tabi ng Pasig River at Marikina River dahil sa patuloy na pag-ulan sa susunod na 48 oras.",
    body: [
      "The MMDA has issued a flood warning for residents and commuters in low-lying areas along the Pasig River and Marikina River basins as PAGASA forecasts continuous moderate to heavy rainfall over Metro Manila for the next 48 hours. Water levels at the Sto. Niño and Rosario monitoring stations in Marikina have reached 15 meters and are expected to continue rising, approaching the critical alarm level of 16 meters.",
      "The MMDA Flood Control Center is on full alert and has activated all pumping stations in the affected areas. Rescue teams and rubber boats have been pre-positioned in barangays historically vulnerable to flooding, including those in Marikina, Pasig, Cainta, and Taguig. Residents in these areas are urged to prepare emergency go-bags, secure important documents, and be ready to evacuate to designated centers if water levels continue to rise.",
      "The MMDA reminds the public to avoid crossing flooded streets and waterways, as floodwaters may conceal open manholes and deep sections. Stranded motorists should contact the MMDA Metrobase at 136 for assistance. Real-time water level monitoring data is available on the MMDA website and the MMDA Flood Monitoring Facebook page. The agency will issue updates every two hours or as conditions warrant until the warning is lifted.",
    ],
    bodyFil: [
      "Nag-isyu ang MMDA ng flood warning para sa mga residente at commuter sa mababang lugar sa tabi ng Pasig River at Marikina River basins dahil ang PAGASA ay nagtataya ng patuloy na katamtaman hanggang malakas na pag-ulan sa Metro Manila sa susunod na 48 oras. Ang water levels sa Sto. Niño at Rosario monitoring stations sa Marikina ay umabot na sa 15 metro at inaasahang patuloy na tataas, papalapit sa critical alarm level na 16 metro.",
      "Ang MMDA Flood Control Center ay nasa full alert at na-activate na ang lahat ng pumping stations sa mga apektadong lugar. Mga rescue team at rubber boat ang na-pre-position sa mga barangay na makasaysayang bulnerable sa pagbaha, kabilang ang mga nasa Marikina, Pasig, Cainta, at Taguig. Hinihikayat ang mga residente sa mga lugar na ito na maghanda ng emergency go-bag, i-secure ang mahahalagang dokumento, at maging handa na mag-evacuate sa mga itinalagang sentro kung patuloy na tataas ang water levels.",
      "Pinapaalalahanan ng MMDA ang publiko na iwasan ang pagtawid sa mga binabahang kalsada at daluyan ng tubig, dahil maaaring nakatago sa baha ang mga bukas na manhole at malalim na bahagi. Ang mga naistrandang motorista ay dapat makipag-ugnayan sa MMDA Metrobase sa 136 para sa tulong. Ang real-time na water level monitoring data ay makukuha sa MMDA website at sa MMDA Flood Monitoring Facebook page. Maglalabas ang ahensya ng mga update tuwing dalawang oras o kung kinakailangan hanggang sa ma-lift ang babala.",
    ],
    category: "advisory",
    date: "2026-04-08",
    imageUrl: "/images/5.jpg",
  },
  {
    id: "11",
    slug: "mmda-road-safety-campaign-schools",
    title: "MMDA Launches Road Safety Campaign in Metro Manila Schools",
    titleFil: "MMDA Naglunsad ng Road Safety Campaign sa mga Paaralan sa Metro Manila",
    excerpt:
      "The MMDA kicks off a road safety education campaign targeting elementary and high school students across Metro Manila, in partnership with DepEd and the PNP.",
    excerptFil:
      "Sinimulan ng MMDA ang road safety education campaign na nakatuon sa mga estudyante ng elementary at high school sa Metro Manila, kasama ang DepEd at PNP.",
    body: [
      "The MMDA has officially launched its road safety education campaign targeting elementary and high school students across Metro Manila, in partnership with the Department of Education (DepEd) and the Philippine National Police Highway Patrol Group (PNP-HPG). The campaign, dubbed \"Safe Streets, Smart Kids,\" aims to reach over 500,000 students in 2,000 public and private schools throughout the academic year.",
      "The program includes interactive classroom sessions covering pedestrian safety, proper use of crosswalks, understanding traffic signs and signals, and safe behavior around school zones. MMDA traffic safety officers and PNP personnel will conduct on-site demonstrations, and schools will receive educational materials including posters, activity booklets, and reflective arm bands for students who walk to school. A dedicated mobile app with road safety quizzes and games is also being developed for student engagement.",
      "MMDA Chairman Romando Artes stated that investing in road safety education for young people is critical to building a culture of responsible road use in Metro Manila. Statistics show that pedestrian-related accidents near school zones have increased by 12% over the past year, underscoring the urgency of the campaign. The agency will work with school administrators to integrate road safety awareness into regular school activities and will recognize top-performing schools through an annual road safety awards program.",
    ],
    bodyFil: [
      "Opisyal nang inilunsad ng MMDA ang road safety education campaign na nakatuon sa mga estudyante ng elementary at high school sa buong Metro Manila, kasama ang Department of Education (DepEd) at Philippine National Police Highway Patrol Group (PNP-HPG). Ang kampanya, na tinawag na \"Safe Streets, Smart Kids,\" ay naglalayong maabot ang mahigit 500,000 estudyante sa 2,000 pampubliko at pribadong paaralan sa buong academic year.",
      "Ang programa ay kinabibilangan ng interactive classroom sessions na sumasaklaw sa pedestrian safety, tamang paggamit ng crosswalk, pag-unawa sa mga traffic sign at signal, at ligtas na pag-uugali sa paligid ng mga school zone. Ang mga MMDA traffic safety officer at PNP personnel ay magsasagawa ng on-site demonstration, at ang mga paaralan ay makakatanggap ng mga educational material kabilang ang mga poster, activity booklet, at reflective arm band para sa mga estudyanteng naglalakad papuntang paaralan. Isang dedicated mobile app na may road safety quizzes at games ang dine-develop din para sa pakikilahok ng mga estudyante.",
      "Sinabi ni MMDA Chairman Romando Artes na ang pag-invest sa road safety education para sa mga kabataan ay mahalaga sa pagbuo ng kultura ng responsableng paggamit ng kalsada sa Metro Manila. Ipinakikita ng mga estadistika na ang mga aksidenteng may kaugnayan sa mga pedestrian malapit sa school zone ay tumaas ng 12% sa nakaraang taon, na nagbibigay-diin sa pagkaapurahan ng kampanya. Makikipagtulungan ang ahensya sa mga school administrator upang maisama ang road safety awareness sa mga regular na aktibidad sa paaralan at magbibigay-pugay sa mga nangunguna na paaralan sa pamamagitan ng taunang road safety awards program.",
    ],
    category: "press",
    date: "2026-04-05",
    imageUrl: "/images/1.jpg",
  },
  {
    id: "12",
    slug: "sidewalk-clearing-operations-quezon-city",
    title: "Sidewalk Clearing Operations Resume in Quezon City",
    titleFil: "Sidewalk Clearing Operations Nagpatuloy sa Quezon City",
    excerpt:
      "MMDA resumes sidewalk clearing operations along major commercial areas in Quezon City to ensure safe and accessible pedestrian walkways for the public.",
    excerptFil:
      "Ipinagpatuloy ng MMDA ang sidewalk clearing operations sa mga pangunahing commercial area sa Quezon City upang matiyak ang ligtas at accessible na daanan para sa publiko.",
    body: [
      "The MMDA has resumed its sidewalk clearing operations along major commercial areas in Quezon City, targeting illegal vendors, obstructions, and unauthorized structures that have encroached on pedestrian walkways. The operations, conducted in coordination with the Quezon City local government, focus on high-traffic areas including Araneta Center, Muñoz, and the stretch of Commonwealth Avenue near Ever Gotesco Mall.",
      "During the first week of operations, MMDA personnel cleared over 3 kilometers of sidewalks, removing illegally placed signboards, parked vehicles, and semi-permanent vendor stalls that had reduced walkable space to less than one meter in some areas. Displaced vendors are being assisted by the Quezon City social welfare office in relocating to designated vending areas and public markets. The MMDA emphasized that the operations are conducted humanely and in compliance with due process requirements.",
      "The MMDA reiterates that sidewalks are public spaces intended exclusively for pedestrian use, and any obstruction poses safety risks particularly for persons with disabilities, senior citizens, and children. Property owners and business establishments along the cleared areas are reminded to maintain the sidewalk fronting their properties free from obstructions. Repeat violators will face penalties under the MMDA's regulations, including fines and removal of business permits in coordination with the local government.",
    ],
    bodyFil: [
      "Ipinagpatuloy ng MMDA ang sidewalk clearing operations sa mga pangunahing commercial area sa Quezon City, na tinatarget ang mga ilegal na vendor, obstruction, at mga hindi awtorisadong istruktura na pumasok sa mga pedestrian walkway. Ang mga operasyon, na isinasagawa sa koordinasyon ng lokal na pamahalaan ng Quezon City, ay nakatuon sa mga high-traffic area kabilang ang Araneta Center, Muñoz, at ang bahagi ng Commonwealth Avenue malapit sa Ever Gotesco Mall.",
      "Sa unang linggo ng operasyon, ang mga tauhan ng MMDA ay naglinis ng mahigit 3 kilometro ng mga sidewalk, tinanggal ang mga iligal na nakalagay na signboard, nakaparadang sasakyan, at semi-permanent na vendor stall na nagpabawas ng malalakaran sa wala pang isang metro sa ilang lugar. Ang mga na-displace na vendor ay tinutulungan ng Quezon City social welfare office sa paglipat sa mga itinalagang vending area at pampublikong palengke. Binigyang-diin ng MMDA na ang mga operasyon ay isinasagawa nang makatao at alinsunod sa mga kinakailangan ng due process.",
      "Inuulit ng MMDA na ang mga sidewalk ay mga pampublikong espasyo na eksklusibong inilaan para sa paggamit ng mga pedestrian, at anumang obstruction ay nagdudulot ng panganib sa kaligtasan lalo na para sa mga may kapansanan, matatanda, at mga bata. Ang mga may-ari ng ari-arian at mga establisyimento ng negosyo sa mga nalinis na lugar ay pinapaalalahanan na panatilihing malinis ang sidewalk sa harap ng kanilang mga ari-arian mula sa mga obstruction. Ang mga paulit-ulit na lumalabag ay haharap sa mga parusa sa ilalim ng mga regulasyon ng MMDA, kabilang ang multa at pag-alis ng business permit sa koordinasyon ng lokal na pamahalaan.",
    ],
    category: "notice",
    date: "2026-04-02",
    imageUrl: "/images/2.jpg",
  },
];

export const mockServices: ServiceItem[] = [
  {
    id: "drivers-license",
    title: "Driver's License",
    titleFil: "Lisensya sa Pagmamaneho",
    description: "Verify violations, check clearance status, and resolve license-related concerns.",
    descriptionFil: "I-verify ang mga paglabag, i-check ang clearance status, at resolbahin ang mga usapin sa lisensya.",
    href: "/services/drivers-license",
    icon: "IdentificationCard",
  },
  {
    id: "traffic-violations",
    title: "Traffic Violations",
    titleFil: "Paglabag sa Trapiko",
    description: "Look up violations, pay fines, and understand penalties for traffic infractions.",
    descriptionFil: "Hanapin ang mga paglabag, magbayad ng multa, at unawain ang mga parusa sa trapiko.",
    href: "/services/traffic-violations",
    icon: "Warning",
  },
  {
    id: "report-concern",
    title: "Report a Concern",
    titleFil: "Mag-ulat ng Problema",
    description: "Submit reports about road issues, illegal structures, flooding, or other concerns.",
    descriptionFil: "Mag-submit ng ulat tungkol sa mga problema sa kalsada, iligal na istruktura, baha, o iba pa.",
    href: "/services/report-concern",
    icon: "ChatCircleDots",
  },
  {
    id: "towing-impound",
    title: "Towing & Impound",
    titleFil: "Towing at Impound",
    description: "Locate towed vehicles, check impound status, and process vehicle release.",
    descriptionFil: "Hanapin ang na-tow na sasakyan, i-check ang impound status, at i-process ang paglabas.",
    href: "/services/towing-impound",
    icon: "Truck",
  },
];

export const mockTrafficRoutes: TrafficRoute[] = [
  { id: "edsa-nb", name: "EDSA Northbound", status: "heavy", speed: 12, updatedAt: "2 min ago" },
  { id: "edsa-sb", name: "EDSA Southbound", status: "moderate", speed: 25, updatedAt: "2 min ago" },
  { id: "c5-nb", name: "C5 Northbound", status: "light", speed: 45, updatedAt: "3 min ago" },
  { id: "c5-sb", name: "C5 Southbound", status: "moderate", speed: 30, updatedAt: "3 min ago" },
  { id: "commonwealth", name: "Commonwealth Ave", status: "heavy", speed: 15, updatedAt: "1 min ago" },
  { id: "quezon-ave", name: "Quezon Avenue", status: "light", speed: 40, updatedAt: "4 min ago" },
];

export const mockAdvisory = {
  active: true,
  type: "weather" as const,
  title: "Rainfall Advisory: Heavy rains expected in NCR this afternoon",
  titleFil: "Rainfall Advisory: Malakas na ulan na inaasahan sa NCR ngayong hapon",
  severity: "moderate" as const,
};
