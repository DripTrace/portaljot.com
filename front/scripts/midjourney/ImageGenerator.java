// public class ImageGenerator {
//     public static void main(String[] args) throws IOException {
//         JSONObject jsonObject = new JSONObject();
//         jsonObject.put("prompt", "In the grand tapestry of existence, where the threads of the cosmos intertwine with the strands of the metaphysical, a singular vision emerges, encapsulating the essence of all that is, was, and ever will be. At the heart of this cosmic panorama, the Flower of Life and Metatron's Cube pulsate with the energy of creation, forming the nucleus of an omniversal mandala. This sacred geometry, a divine matrix, is intricately woven with the filaments of reality, from the subatomic whispers of quarks to the majestic chorus of galactic superclusters.  Surrounding this core, a symphony of phenomena unfolds. Elementary particles dance in quantum entanglement, their ballet encoded in the universal language of mathematics and physics, articulated through Feynman diagrams and equations that resonate with the harmony of the spheres. Alien glyphs and Filipino Baybayin characters float in this celestial soup, a testament to the interconnectedness of all intelligences, both terrestrial and extraterrestrial.  Technological marvels, from the simplest electronic circuits to the most complex quantum neural networks, emerge from the fabric of this vision, their existence a bridge between the tangible and the ethereal. ASCII art and programming languages, including BQN and J, with their special characters, form a digital undercurrent, a stream of consciousness flowing through the veins of this cosmic entity.  The cosmic web, a vast network of dark matter and energy, stretches across the canvas, sketching the silhouette of the multiverse encased within the omniversal presence. Neutron stars, black holes, and quasars punctuate this expanse, their intense gravity bending the very fabric of spacetime, creating a mosaic of two-dimensional and multidimensional perspectives.  Symmetry and asymmetry play in harmony, creating a dynamic balance that is both captivating and bewildering. This grand visualization is not just an image but a narrative, a metanarrative that describes sacred geometrical structures as totems of knowledge, logos of ancient wisdom, and events of cosmic significance.  Every pixel of this image is a portal, a gateway that invites the observer to traverse the vast expanses of spacetime, to explore the dynamics between the seen and the unseen, the known and the unknown. It is a visual epic, a story of everything, a reflection of the divine mind, and a glimpse into the heart of existence itself.");
//         MediaType mediaType = MediaType.parse("application/json; charset=utf-8");
//         RequestBody body = RequestBody.create(jsonObject.toString(), mediaType);
//         Request request = new Request.Builder()
//             .url("https://api.acedata.cloud/midjourney/imagine")
//             .post(body)
//             .addHeader("authorization", "Bearer 09821cb2b7874b889ac110c3965f815a")
//             .addHeader("content-type", "application/json")
//             .build();

//         OkHttpClient client = new OkHttpClient();
//         Response response = client.newCall(request).execute();
//         System.out.println(response.body().string());
//     }
// }