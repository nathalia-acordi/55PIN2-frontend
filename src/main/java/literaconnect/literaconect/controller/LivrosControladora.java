package literaconnect.literaconect.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import literaconnect.literaconect.dto.LivroDTO;
import literaconnect.literaconect.model.Usuario;
import literaconnect.literaconect.service.LivroService;
import literaconnect.literaconect.service.UsuarioService;

@RestController
@RequestMapping("/api/livros")	
public class LivrosControladora {
	
	@Autowired
	private LivroService servico;
	
	@Autowired
	private UsuarioService servicoUsuario;
	
	@GetMapping
	public List<LivroDTO> obterLivros() {
		return servico.obterTodasOsLivros();
	}
	
	@GetMapping("/ultimos-lancamentos")
	public List<LivroDTO> obterUltimosLancamentos() {
		return servico.obterUltimosLancamentosService();
	}
	
	@GetMapping("/livros-em-destaque")
	public List<LivroDTO> obterLivrosEmDestaque() {
		return servico.obterLivrosEmDestaque();
	}
	
	@GetMapping("{titulo}/livros-pesquisado") 
	public List<LivroDTO> obterLivrosPesquisados(@PathVariable String titulo) {
		return servico.obterLivrosPesquisados(titulo);
	}

	@GetMapping("/usuario-cadastrado")
	public boolean isExisteUsuarioCadastrado(@RequestParam String email, @RequestParam String senha) {
		return servicoUsuario.obterUsuarioCadastrado(email, senha);
	}
	
	@GetMapping("/verificar-nome-usuario")
	public boolean isExisteNomeUsuarioCadastrado(@RequestParam String nomeUsuario) {
		return servicoUsuario.isExisteNomeUsuarioCadastrado(nomeUsuario);
	}
	
	@GetMapping("/verificar-email-usuario")
	public boolean isExisteEmailCadastrado(@RequestParam String email) {
		return servicoUsuario.isExisteEmailCadastrado(email);
	}
	
	
	@PostMapping("/cadastrar/usuario") 
	public String cadastrarUsuario(@RequestBody Usuario usuario) throws Exception {
		try {
			servicoUsuario.salvarUsuario(usuario);
			return "Usuário cadastrado com sucesso";
		} catch(Exception e) {
			throw new Exception(e.getMessage());
		}
	}
}
