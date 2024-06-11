package literaconnect.literaconect.service;

import java.util.Scanner;

import literaconnect.literaconect.model.DadosLivros;
import literaconnect.literaconect.model.Item;
import literaconnect.literaconect.model.Livros;
import literaconnect.literaconect.model.VolumeInfo;
import literaconnect.literaconect.repository.LivrosRepository;

public class AdicionarLivrosBiblioteca {

	private static String ENDERECO = "https://www.googleapis.com/books/v1/volumes?q=";
	private static String API_KEY = "&key=AIzaSyCXzMo4o7wWzyEUhhBxKTu2iW8gstzDk88";
	private static ConsumoAPI consumo = new ConsumoAPI();
	private static ConverteDados conversor = new ConverteDados();
	private static LivrosRepository repositorio;

	public AdicionarLivrosBiblioteca(LivrosRepository repositorio) {
		this.repositorio = repositorio;
	}

	public static void main(String[] args) {
		adicionarLivrosBiblioteca();
	}

	public static void adicionarLivrosBiblioteca() {
		Scanner leitura = new Scanner(System.in);

		int adicionarLivro = 1;

		while (adicionarLivro != 0) {
			System.out.println("Digite um livro para adicionar a biblioteca de livros: ");
			String busca = leitura.nextLine();
			System.out.println(ENDERECO + busca.replaceAll("\\s+", "-") + API_KEY);
			var json = consumo.obterDados(ENDERECO + busca.replaceAll("\\s+", "-") + API_KEY);
			DadosLivros dados = conversor.obterDados(json, DadosLivros.class);
			Livros livro = new Livros();
			for (Item item : dados.getItens()) {
				VolumeInfo volume = item.getVolume();
				if (livro.getTitulo() == null && volume.titulo() != null && !volume.titulo().isEmpty()) {
					livro.setTitulo(volume.titulo());
				}
				if (livro.getTitulo().equalsIgnoreCase(volume.titulo())) {
					if (volume.generos() != null && !volume.generos().isEmpty()) {
						livro.setGenero(volume.generos().get(0));
					}
					if (livro.getDataPublicacao() == null && volume.dataLancamento() != null
							&& !volume.dataLancamento().isEmpty()) {
						livro.setDataPublicacao(volume.dataLancamento());
					}
					if (livro.getImagem() == null && volume.imagens() != null && volume.imagens().getUrlImagem() != null
							&& !volume.imagens().getUrlImagem().isEmpty()) {
						livro.setImagem(volume.imagens().getUrlImagem());
					}
					if (livro.getDescricao() == null && volume.descricao() != null && !volume.descricao().isEmpty()) {
						livro.setDescricao(volume.descricao());
					}
					if (livro.getNumeroEstrelas() == null && volume.estrelas() != null) {
						livro.setNumeroEstrelas(volume.estrelas());
					}
				}

				// Se todos os campos necessários forem configurados, interrompa o loop
				if (livro.getGenero() != null && livro.getTitulo() != null && livro.getDataPublicacao() != null
						&& livro.getImagem() != null && livro.getDescricao() != null
						&& livro.getNumeroEstrelas() != null) {
					break;
				}
			}

			repositorio.save(livro);

			System.out.println("Deseja adicionar outro livro? 1-Sim 0-Não");
			adicionarLivro = leitura.nextInt();
			leitura.nextLine();
		}
	}
}
