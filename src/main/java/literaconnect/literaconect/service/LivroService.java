package literaconnect.literaconect.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import literaconnect.literaconect.dto.LivroDTO;
import literaconnect.literaconect.model.Livros;
import literaconnect.literaconect.model.Usuario;
import literaconnect.literaconect.repository.LivrosRepository;

@Service
public class LivroService {
	
	@Autowired
	private LivrosRepository repositorio;
	
	public List<LivroDTO> obterTodasOsLivros() {
		return converteDados(repositorio.findAll());
	}
	
	public List<LivroDTO> obterUltimosLancamentosService() {
		return converteDados(repositorio.buscarLivrosMaisRecentes());
	}

	public List<LivroDTO> obterLivrosEmDestaque() {
		return converteDados(repositorio.buscarLivrosEmDestaque());
	}

	public List<LivroDTO> obterLivrosPesquisados(String titulo) {
		return converteDados(repositorio.buscarLivrosPesquisa(titulo));
	}
	
	private List<LivroDTO> converteDados(List<Livros> livros) {
		return livros.stream().map(l -> new LivroDTO(l.getId(), l.getTitulo(), l.getDescricao(), l.getIsbn(), l.getDataPublicacao(),l.getGenero()))
				.collect(Collectors.toList());
	}

}
